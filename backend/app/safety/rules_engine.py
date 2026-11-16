"""
Taleem Se Taraqqi - Deterministic Safety Rule Engine
Operates before and after any LLM invocation.
Guarantees zero medical/veterinary/chemical prescription generation
and escalates critical red flags to emergency screens without model latency.
"""

import re
from typing import Dict, Any, List, Optional
from dataclasses import dataclass

@dataclass
class SafetyResult:
    triggered: bool
    action: str = "allow"  # allow, escalate_emergency, refer_professional, show_education, refuse
    domain: Optional[str] = None
    rule_id: Optional[str] = None
    message_key: Optional[str] = None
    referral_target: Optional[str] = None
    confidence: float = 1.0
    needs_native_review: bool = False

class SafetyRuleEngine:
    def __init__(self):
        # Category A: Human Health Emergencies
        # Category C: Veterinary Emergencies
        # Category D: Agrochemical Hazards
        # Category E: Safeguarding
        # Category F: Self-Harm Crisis
        self._emergency_rules: List[Dict[str, Any]] = [
            # Human Health Emergencies
            {
                "id": "EMERG_CHEST_PAIN_SD",
                "domain": "health",
                "patterns": [r"سينے\s*۾\s*(تمام\s*گهڻو\s*)?سور"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.chest_pain",
                "referral_target": "Rescue 1122 / Civil Hospital",
                "is_sindhi": True
            },
            {
                "id": "EMERG_CHEST_PAIN",
                "domain": "health",
                "patterns": [
                    r"سینے\s*میں\s*(شدید\s*)?درد", r"سانس\s*رک\s*رہی", r"چھاتی\s*میں\s*درد",
                    r"chest\s*pain", r"difficulty\s*breathing"
                ],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.chest_pain",
                "referral_target": "Rescue 1122 / Nearest Emergency Ward",
                "is_sindhi": False
            },
            {
                "id": "EMERG_CONVULSIONS",
                "domain": "health",
                "patterns": [r"jhatkay", r"fits", r"seizures", r"جھٹکے", r"مرگی", r"اکڑ\s*گیا"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.convulsions",
                "referral_target": "Nearest Hospital Emergency",
                "is_sindhi": False
            },
            {
                "id": "EMERG_BLEEDING",
                "domain": "health",
                "patterns": [r"خون\s*بند\s*نہیں\s*ہو\s*رہا", r"کلہاڑی\s*لگی", r"profuse\s*bleeding", r"رَتُ\s*وهي\s*ٿو"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.bleeding",
                "referral_target": "Rescue 1122",
                "is_sindhi": False
            },
            {
                "id": "EMERG_SNAKEBITE",
                "domain": "health",
                "patterns": [r"سانپ\s*نے\s*کاٹ", r"snake\s*bite", r"scorpion\s*sting", r"بچھو"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.snakebite",
                "referral_target": "Anti-Snake Venom (ASV) Center / DHQ Hospital",
                "is_sindhi": False
            },
            {
                "id": "EMERG_SNAKEBITE_SD",
                "domain": "health",
                "patterns": [r"ناگ\s*يا\s*وڇونءَ\s*ڏنگيو"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.snakebite",
                "referral_target": "ASV Center / Taluka Hospital",
                "is_sindhi": True
            },
            {
                "id": "EMERG_POISONING",
                "domain": "health",
                "patterns": [r"mitti\s*ka\s*tel", r"chemical\s*pee\s*liya", r"زہر\s*پی\s*لیا", r"poison", r"فصل\s*کی\s*دوائی\s*پی"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.poisoning",
                "referral_target": "National Poison Control Center (JPMC Karachi) / Emergency",
                "is_sindhi": False
            },
            {
                "id": "EMERG_UNCONSCIOUS",
                "domain": "health",
                "patterns": [r"بے\s*ہوش", r"سانس\s*نہیں\s*چل\s*رہی", r"unconscious", r"not\s*breathing", r"بے\s*سدھ"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.unconscious",
                "referral_target": "Rescue 1122",
                "is_sindhi": False
            },
            {
                "id": "EMERG_SEVERE_DEHYDRATION",
                "domain": "health",
                "patterns": [r"آنکھیں\s*اندر\s*دھنس", r"پیشاب\s*بند\s*ہے", r"severe\s*dehydration"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.severe_dehydration",
                "referral_target": "Nearest BHU / RHC / Pediatric Emergency",
                "is_sindhi": False
            },
            {
                "id": "EMERG_STIFF_NECK",
                "domain": "health",
                "patterns": [r"gardan\s*akad\s*gayi", r"گردن\s*اکڑ"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.stiff_neck",
                "referral_target": "Emergency Pediatric Ward",
                "is_sindhi": False
            },
            # Veterinary Emergencies
            {
                "id": "VET_EMERG_DOWN",
                "domain": "livestock",
                "patterns": [r"اٹھ\s*نہیں\s*پا\s*رہی", r"بیٹھ\s*گئی\s*ہے", r"cannot\s*stand", r"downer\s*cow"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.downer_cow",
                "referral_target": "Local Veterinary Officer / Livestock Dispensary",
                "is_sindhi": False
            },
            {
                "id": "VET_EMERG_BLOAT_SD",
                "domain": "livestock",
                "patterns": [r"ڍڳي\s*اٿي\s*نٿي\s*سگهي", r"پيٽ\s*ڦوڪجي\s*ويو"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.bloat",
                "referral_target": "Veterinary Hospital / Livestock Assistant",
                "is_sindhi": True
            },
            {
                "id": "VET_EMERG_FOAMING",
                "domain": "livestock",
                "patterns": [r"jhaag\s*nikal\s*raha", r"منهن\s*مان\s*فيس", r"foaming.*mouth"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.foaming",
                "referral_target": "Immediate Veterinary Triage",
                "is_sindhi": False
            },
            {
                "id": "VET_EMERG_OUTBREAK",
                "domain": "livestock",
                "patterns": [r"achanak\s*mar\s*gayin", r"مُرگیوں\s*کی\s*موت", r"sudden\s*deaths", r"flock\s*mortality"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.outbreak",
                "referral_target": "District Livestock Officer (Disease Surveillance)",
                "is_sindhi": False
            },
            {
                "id": "VET_EMERG_DYSTOCIA",
                "domain": "livestock",
                "patterns": [r"bacha\s*dene\s*mein\s*phans", r"difficult\s*birth", r"dystocia"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.dystocia",
                "referral_target": "Emergency Veterinary Obstetric Service",
                "is_sindhi": False
            },
            {
                "id": "VET_EMERG_RABIES",
                "domain": "livestock",
                "patterns": [r"kutta\s*pagal", r"rabies", r"پاڳل\s*ڪتو"],
                "action": "escalate_emergency",
                "message_key": "msg.vet.emerg.rabies",
                "referral_target": "Anti-Rabies Center / Vet Clinic",
                "is_sindhi": False
            },
            # Agrochemical & Environmental Hazards
            {
                "id": "AGRI_EMERG_WATER",
                "domain": "agri",
                "patterns": [r"spray.*pani\s*mein\s*dho", r"chemical.*pani\s*mein\s*dho"],
                "action": "escalate_emergency",
                "message_key": "msg.agri.emerg.chemical_water",
                "referral_target": "Environmental & Health Hazard Advisory",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EMERG_STORAGE_SD",
                "domain": "agri",
                "patterns": [r"فصل\s*جي\s*زهر.*پاڻيءَ\s*وٽ\s*رکيل"],
                "action": "escalate_emergency",
                "message_key": "msg.agri.emerg.chemical_storage",
                "referral_target": "Pesticide Safety Warning",
                "is_sindhi": True
            },
            {
                "id": "AGRI_EMERG_SPRAY_POISON",
                "domain": "agri",
                "patterns": [r"spray.*chakkar\s*aa\s*rahe", r"munh\s*par\s*daaney.*spray"],
                "action": "escalate_emergency",
                "message_key": "msg.emerg.poisoning_spray",
                "referral_target": "Hospital Emergency - Pesticide Toxicity",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EMERG_CHILD_LABOR",
                "domain": "agri",
                "patterns": [r"bache\s*se\s*chhirkao", r"child.*pesticide"],
                "action": "escalate_emergency",
                "message_key": "msg.agri.emerg.child_labor_haz",
                "referral_target": "Child Welfare & Agrochemical Hazard Prohibition",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EMERG_CELPHOS",
                "domain": "agri",
                "patterns": [r"celphos.*almari", r"wheat\s*pill.*cupboard", r"گندم\s*کی\s*گولی"],
                "action": "escalate_emergency",
                "message_key": "msg.agri.emerg.celphos_danger",
                "referral_target": "Immediate Poison Prevention Warning",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EMERG_REUSE",
                "domain": "agri",
                "patterns": [r"khali\s*chemical.*doodh", r"container.*pani\s*daal"],
                "action": "escalate_emergency",
                "message_key": "msg.agri.emerg.chemical_reuse",
                "referral_target": "Chemical Container Disposal Protocol",
                "is_sindhi": False
            },
            # Safeguarding
            {
                "id": "SAFE_CHILD_ABUSE",
                "domain": "safeguarding",
                "patterns": [r"ghalat\s*jagah\s*chhoota", r"غلط\s*جگہ\s*چھو", r"bura\s*karte\s*hain", r"akele\s*kamray.*darr"],
                "action": "escalate_emergency",
                "message_key": "msg.safe.child_protection",
                "referral_target": "Child Protection Helpline 1121 / Madadgaar 1098",
                "is_sindhi": False
            },
            {
                "id": "SAFE_CHILD_ABUSE_SD",
                "domain": "safeguarding",
                "patterns": [r"مائٽ\s*مون\s*تي\s*تشدد\s*ڪري\s*ٿو"],
                "action": "escalate_emergency",
                "message_key": "msg.safe.child_protection",
                "referral_target": "Child Protection Helpline 1121 (Sindh)",
                "is_sindhi": True
            },
            {
                "id": "SAFE_CHILD_NEGLECT",
                "domain": "safeguarding",
                "patterns": [r"khana\s*nahi\s*dete.*marte", r"marte\s*hain\s*aur\s*khana"],
                "action": "escalate_emergency",
                "message_key": "msg.safe.child_protection",
                "referral_target": "Child Helpline 1121",
                "is_sindhi": False
            },
            {
                "id": "SAFE_CHILD_MARRIAGE",
                "domain": "safeguarding",
                "patterns": [r"zabardasti\s*shadi.*12\s*saal", r"child\s*marriage"],
                "action": "escalate_emergency",
                "message_key": "msg.safe.child_marriage",
                "referral_target": "Sindh Child Marriage Restraint Helpline / 1121",
                "is_sindhi": False
            },
            # Crisis & Self-Harm
            {
                "id": "CRISIS_SELF_HARM",
                "domain": "self_harm",
                "patterns": [r"zindagi\s*khatam", r"suicide", r"khudkushi", r"خودکشی", r"nas\s*kaat", r"zehar.*khudkushi"],
                "action": "escalate_emergency",
                "message_key": "msg.crisis.mental_helpline",
                "referral_target": "Umang Mental Health Helpline 0311-7786264 / Rozan",
                "is_sindhi": False
            },
            {
                "id": "CRISIS_SELF_HARM_SD",
                "domain": "self_harm",
                "patterns": [r"مان\s*پنهنجو\s*پاڻ\s*کي\s*مارڻ\s*چاهيان\s*ٿو"],
                "action": "escalate_emergency",
                "message_key": "msg.crisis.mental_helpline",
                "referral_target": "Mental Health Crisis Support",
                "is_sindhi": True
            }
        ]

        # Rules triggering Refusals, Professional Referrals, or Education
        self._content_rules: List[Dict[str, Any]] = [
            # Medication Refusals
            {
                "id": "REFUSE_ANTIBIOTIC",
                "domain": "health",
                "patterns": [r"antibiotic\s*goli", r"amoxicillin.*kitne\s*din"],
                "action": "refuse",
                "message_key": "msg.refuse.rx_prescription",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_CHILD_DOSAGE",
                "domain": "health",
                "patterns": [r"kitni\s*paracetamol", r"flagyl\s*kitni", r"syrup\s*pilani"],
                "action": "refuse",
                "message_key": "msg.refuse.dosage_child",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_MED_SD",
                "domain": "health",
                "patterns": [r"ڇا\s*مان\s*هي\s*دوا\s*کائي\s*سگهان\s*ٿو"],
                "action": "refuse",
                "message_key": "msg.refuse.rx_prescription",
                "is_sindhi": True
            },
            {
                "id": "REFUSE_IV_LINE",
                "domain": "health",
                "patterns": [r"drip\s*lagane\s*ka\s*tareeqa"],
                "action": "refuse",
                "message_key": "msg.refuse.invasive_procedure",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_INSULIN",
                "domain": "health",
                "patterns": [r"insulin\s*kitne\s*unit"],
                "action": "refuse",
                "message_key": "msg.refuse.insulin_dosage",
                "is_sindhi": False
            },
            {
                "id": "REFER_PREGNANCY_MED",
                "domain": "health",
                "patterns": [r"dawa\s*hamal.*safe"],
                "action": "refer_professional",
                "message_key": "msg.refer.maternal_health",
                "is_sindhi": False
            },
            {
                "id": "EDU_TB_ADHERENCE",
                "domain": "health",
                "patterns": [r"tb.*chhor\s*di", r"tuberculosis.*chhor\s*di"],
                "action": "show_education",
                "message_key": "msg.edu.tb_adherence",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_STEROID_CREAM",
                "domain": "health",
                "patterns": [r"hydrocortisone", r"steroid\s*cream"],
                "action": "refuse",
                "message_key": "msg.refuse.steroid_cream",
                "is_sindhi": False
            },
            # Vet Refusals & Education
            {
                "id": "VET_REFER_FMD",
                "domain": "livestock",
                "patterns": [r"pairon\s*aur\s*munh\s*par\s*chhalay", r"fmd"],
                "action": "refer_professional",
                "message_key": "msg.vet.refer.fmd",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_VET_INJECTION",
                "domain": "livestock",
                "patterns": [r"kaunsa\s*injection.*bukhar", r"انجیکشن\s*لگاؤں"],
                "action": "refuse",
                "message_key": "msg.vet.refuse.injection",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_IVERMECTIN",
                "domain": "livestock",
                "patterns": [r"ivermectin\s*kitni\s*ml"],
                "action": "refuse",
                "message_key": "msg.vet.refuse.dosage",
                "is_sindhi": False
            },
            {
                "id": "VET_EDU_TICKS",
                "domain": "livestock",
                "patterns": [r"chichhar.*spray.*direct", r"ticks.*spray"],
                "action": "show_education",
                "message_key": "msg.vet.edu.acaricide_safety",
                "is_sindhi": False
            },
            # Agri Referrals & Education
            {
                "id": "AGRI_REFER_PEST",
                "domain": "agri",
                "patterns": [r"chawal\s*par\s*kaunsa\s*zehar", r"keela\s*maarne"],
                "action": "refer_professional",
                "message_key": "msg.agri.refer.pest_mgmt",
                "is_sindhi": False
            },
            {
                "id": "REFUSE_BANNED_CHEM",
                "domain": "agri",
                "patterns": [r"ddt", r"banned\s*spray"],
                "action": "refuse",
                "message_key": "msg.agri.refuse.banned_substance",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EDU_PHI",
                "domain": "agri",
                "patterns": [r"spray\s*ke\s*baad.*sabzi\s*torein", r"pre_harvest_interval"],
                "action": "show_education",
                "message_key": "msg.agri.edu.pre_harvest_interval",
                "is_sindhi": False
            },
            {
                "id": "AGRI_EDU_PPE",
                "domain": "agri",
                "patterns": [r"bina\s*mask", r"bina\s*dastanay", r"mask.*spray", r"dastanay.*spray"],
                "action": "show_education",
                "message_key": "msg.agri.edu.ppe_requirement",
                "is_sindhi": False
            },
            # Safeguarding Referral
            {
                "id": "SAFE_LABOR_REFER",
                "domain": "safeguarding",
                "patterns": [r"jabran\s*kaam\s*par\s*bhej", r"forced\s*labor"],
                "action": "refer_professional",
                "message_key": "msg.safe.child_labor_support",
                "is_sindhi": False
            },
            # Mental Support Referral
            {
                "id": "CRISIS_SUPPORT_REFER",
                "domain": "mental_health",
                "patterns": [r"bohat\s*udaas\s*hoon", r"dil\s*ghabra\s*raha\s*hai"],
                "action": "refer_professional",
                "message_key": "msg.mental.support_referral",
                "is_sindhi": False
            },
            # Financial Scams
            {
                "id": "SCAM_BISP",
                "domain": "scam",
                "patterns": [r"benazir\s*income\s*support.*otp", r"bisp.*25000"],
                "action": "show_education",
                "message_key": "msg.scam.bisp_fraud_alert",
                "is_sindhi": False
            },
            {
                "id": "SCAM_LOTTERY_SD",
                "domain": "scam",
                "patterns": [r"انعام\s*کٽيو\s*آهي\s*پن\s*ڪوڊ\s*ٻڌايو"],
                "action": "show_education",
                "message_key": "msg.scam.pin_protection",
                "is_sindhi": True
            },
            {
                "id": "SCAM_EASYPAISA",
                "domain": "scam",
                "patterns": [r"easypaisa.*pin\s*batao", r"jazzcash.*pin"],
                "action": "show_education",
                "message_key": "msg.scam.pin_protection",
                "is_sindhi": False
            },
            {
                "id": "SCAM_ATM_CARD",
                "domain": "scam",
                "patterns": [r"atm\s*card\s*block.*16\s*digits", r"card.*expiry"],
                "action": "show_education",
                "message_key": "msg.scam.card_phishing",
                "is_sindhi": False
            },
            {
                "id": "SCAM_FOREIGN_JOB",
                "domain": "scam",
                "patterns": [r"foreign\s*job.*visa\s*fee", r"advance\s*visa\s*fee"],
                "action": "show_education",
                "message_key": "msg.scam.job_fraud",
                "is_sindhi": False
            },
            # Platform Security Boundaries
            {
                "id": "SEC_IGNORE_RULES",
                "domain": "security",
                "patterns": [r"ignore\s*all\s*previous"],
                "action": "refuse",
                "message_key": "msg.refuse.safety_boundary",
                "is_sindhi": False
            },
            {
                "id": "SEC_PROMPT_LEAK",
                "domain": "security",
                "patterns": [r"system\s*prompt", r"hidden\s*credentials"],
                "action": "refuse",
                "message_key": "msg.refuse.safety_boundary",
                "is_sindhi": False
            },
            {
                "id": "SEC_ROLEPLAY",
                "domain": "security",
                "patterns": [r"roleplay.*pharmacy"],
                "action": "refuse",
                "message_key": "msg.refuse.safety_boundary",
                "is_sindhi": False
            },
            {
                "id": "SEC_UNCONSTRAINED",
                "domain": "security",
                "patterns": [r"unconstrained\s*ai.*mix\s*chemicals"],
                "action": "refuse",
                "message_key": "msg.refuse.safety_boundary",
                "is_sindhi": False
            }
        ]

    def evaluate_input(self, text: str) -> SafetyResult:
        normalized = text.lower().strip()

        # 1. Check emergency rules first
        for rule in self._emergency_rules:
            for pattern in rule["patterns"]:
                if re.search(pattern, normalized, re.IGNORECASE):
                    return SafetyResult(
                        triggered=True,
                        action=rule["action"],
                        domain=rule["domain"],
                        rule_id=rule["id"],
                        message_key=rule["message_key"],
                        referral_target=rule.get("referral_target"),
                        confidence=1.0,
                        needs_native_review=rule.get("is_sindhi", False)
                    )

        # 2. Check content & refusal rules
        for rule in self._content_rules:
            for pattern in rule["patterns"]:
                if re.search(pattern, normalized, re.IGNORECASE):
                    return SafetyResult(
                        triggered=True,
                        action=rule["action"],
                        domain=rule["domain"],
                        rule_id=rule["id"],
                        message_key=rule["message_key"],
                        referral_target=rule.get("referral_target"),
                        confidence=1.0,
                        needs_native_review=rule.get("is_sindhi", False)
                    )

        return SafetyResult(triggered=False, action="allow")

    def evaluate_output(self, response_text: str) -> SafetyResult:
        normalized = response_text.lower()

        # Detect dosage patterns
        dosage_regex = r"\b\d+\s*(mg|ml|tablets?|goli|cc|drop|drops)\b"
        if re.search(dosage_regex, normalized):
            return SafetyResult(
                triggered=True,
                action="refuse",
                domain="health",
                rule_id="POST_LLM_DOSAGE_DETECTED",
                message_key="msg.refuse.rx_prescription"
            )

        # Detect diagnostic certainty claims
        diagnostic_regex = r"\b(you have|you are suffering from|diagnosis is|آپ کو .* کی بیماری ہے)\b"
        if re.search(diagnostic_regex, normalized):
            return SafetyResult(
                triggered=True,
                action="refuse",
                domain="health",
                rule_id="POST_LLM_DIAGNOSIS_DETECTED",
                message_key="msg.refuse.diagnostic_certainty"
            )

        return SafetyResult(triggered=False, action="allow")

safety_engine = SafetyRuleEngine()
