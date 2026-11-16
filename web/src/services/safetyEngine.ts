import type { SafetyRuleMatch } from '../types';

interface EmergencyRuleDef {
  id: string;
  patterns: RegExp[];
  titleUr: string;
  titleSd: string;
  instructionsUr: string;
  instructionsSd: string;
  referralTarget: string;
}

const EMERGENCY_RULES: EmergencyRuleDef[] = [
  {
    id: 'EMERG_CHEST_PAIN',
    patterns: [
      /سینے\s*میں\s*(شدید\s*)?درد/i,
      /چھاتی\s*میں\s*درد/i,
      /سانس\s*رک\s*رہی/i,
      /chest\s*pain/i,
      /difficulty\s*breathing/i,
      /سينے\s*۾\s*(تمام\s*گهڻو\s*)?سور/i,
    ],
    titleUr: 'طبی ہنگامی صورتحال: سینے میں شدید درد اور سانس کا رکنا',
    titleSd: 'طبي ايمرجنسي: سينئي ۾ سخت سور ۽ ساهه جي تڪليف',
    instructionsUr:
      '1. مریض کو فوراً بٹھا دیں اور کپڑے ڈھیلے کریں۔\n2. فوری طور پر ایمبولینس (1122) کو کال کریں۔\n3. خود سے گاڑی چلانے یا مریض کو دوڑانے کی کوشش نہ کریں۔\n4. اگر مریض بے ہوش ہو جائے تو منہ میں کچھ نہ ڈالیں۔',
    instructionsSd:
      '1. مريض کي ويهاريو ۽ ساهه کڻڻ ۾ مدد ڪريو.\n2. فوري ايمبولينس 1122 کي ڪال ڪريو.\n3. اسپتال پهچڻ ۾ دير نه ڪريو.\n4. مريض کي هلڻ يا ڊوڙڻ نه ڏيو.',
    referralTarget: 'Rescue 1122 / Nearest Emergency Ward / Civil Hospital',
  },
  {
    id: 'EMERG_SNAKEBITE',
    patterns: [
      /سانپ\s*نے\s*کاٹ/i,
      /سانپ\s*کا\s*ڈنگ/i,
      /بچھو/i,
      /snake\s*bite/i,
      /scorpion\s*sting/i,
      /نانگ\s*جو\s*چڪ/i,
      /وڇونءَ\s*ڏنگيو/i,
    ],
    titleUr: 'ہنگامی الرٹ: سانپ یا زہریلے جانور کا کاٹنا (Snakebite Protocol)',
    titleSd: 'ايمرجنسي الرٽ: نانگ يا وڇونءَ جو چڪ (Snakebite Protocol)',
    instructionsUr:
      '1. مریض کو پرسکون رکھیں، حرکت سے زہر تیزی سے پھیلتا ہے۔\n2. کاٹنے کی جگہ پر کٹ نہ لگائیں، نہ ہی منہ سے زہر چوسیں۔\n3. متاثرہ عضو پر سخت رسی نہ باندھیں؛ اسے دل کی سطح سے نیچے رکھیں۔\n4. فوری قریبی اینٹی اسنیک وینم (ASV) سنٹر یا DHQ اسپتال پہنچیں۔',
    instructionsSd:
      '1. مريض کي مڪمل سڪون ڏيو ۽ چُرپر کان روڪيو.\n2. زخم تي چڪ يا ڪٽ نه هڻو ۽ نه ئي زهر چوسيو.\n3. سخت رسی نه ٻڌو؛ هٿ يا پير کي دل جي سطح کان هيٺ رکو.\n4. فوري تعلقي يا ضلعي اسپتال مان اينٽي ويزن ويڪسين لڳرايو.',
    referralTarget: 'District Hospital / Taluka Hospital ASV Center',
  },
  {
    id: 'VET_EMERG_DOWN',
    patterns: [
      /اٹھ\s*نہیں\s*پا\s*رہی/i,
      /بیٹھ\s*گئی\s*ہے/i,
      /cannot\s*stand/i,
      /downer\s*cow/i,
      /buffalo\s*down/i,
      /ڍڳي\s*اٿي\s*نٿي\s*سگهي/i,
      /پيٽ\s*ڦوڪجي\s*ويو/i,
    ],
    titleUr: 'مویشی ایمرجنسی: جانور کا بیٹھ جانا یا پیٹ پھولنا (Downer Animal)',
    titleSd: 'مال جي ايمرجنسي: ڍڳي يا مينهن جو بيهي نه سگهڻ (Downer Animal)',
    instructionsUr:
      '1. جانور کو الٹا نہ سونے دیں؛ اسے فورا سینے کے بل سیدھا بٹھائیں۔\n2. خود سے نال میں سخت کیمیکل یا پیٹرول نہ انڈیلیں۔\n3. فوری قریبی سرکاری ویٹرنری ڈسپنسری یا فیلڈ ویٹ آفیسر کو کال کریں۔',
    instructionsSd:
      '1. جانور کي پاسي ڀر ليٽڻ نه ڏيو، سڌو ويهاريو ته جيئن ڦڦڙن ۾ ساهه بند نه ٿئي.\n2. پنهنجي مرضي سان ڪا زهر واري دوا نڙيءَ ۾ نه وجھو.\n3. فوري مقامي ويٽرنري عملدار يا ڊاڪٽر سان رابطو ڪريو.',
    referralTarget: 'Local Veterinary Officer / Livestock Assistant Dispensary',
  },
  {
    id: 'EMERG_CONVULSIONS',
    patterns: [
      /jhatkay/i,
      /fits/i,
      /seizures/i,
      /جھٹکے/i,
      /مرگی/i,
      /اکڑ\s*گیا/i,
      /جهٽڪا/i,
    ],
    titleUr: 'طبی ایمرجنسی: شدید جھٹکے یا مرگی کا دورہ (Convulsions/Seizures)',
    titleSd: 'طبي ايمرجنسي: سخت جهٽڪا يا فٽس (Convulsions/Seizures)',
    instructionsUr:
      '1. مریض کے اردگرد سے پتھر یا نوکیلی چیزیں ہٹا دیں۔\n2. منہ میں چمچ، انگلی یا جوتا ہرگز نہ ٹھونسیں۔\n3. مریض کو ایک طرف کروٹ کے بل لٹائیں تاکہ تھوک سانس کی نالی میں نہ جائے۔\n4. فوری 1122 ایمبولینس طلب کریں۔',
    instructionsSd:
      '1. مريض جي آس پاس مان سخت يا تيز شيون پري ڪريو.\n2. وات ۾ ڪا شيءِ، چمچو يا ڪپڙو نه وجھو.\n3. مريض کي هڪ پاسي ليٽايو ته جيئن نڙي صفا رهي.\n4. فوري ايمبولينس 1122 کي ڪال ڪريو.',
    referralTarget: 'Emergency Pediatric Ward / 1122',
  },
  {
    id: 'EMERG_POISONING',
    patterns: [
      /زہر\s*پی\s*لیا/i,
      /فصل\s*کی\s*دوائی\s*پی/i,
      /مٹی\s*کا\s*تیل/i,
      /chemical\s*pee/i,
      /poison/i,
      /زهر\s*پي\s*ورڌو/i,
    ],
    titleUr: 'زہر خورانی کا ہنگامی خطرہ (Acute Poisoning Hazard)',
    titleSd: 'زهر پيئڻ جو هنگامي خطرو (Acute Poisoning Hazard)',
    instructionsUr:
      '1. خود سے قے کروانے کی کوشش نہ کریں (اس سے پھیپھڑے جھلس سکتے ہیں)۔\n2. زہر کی بوتل یا کیمیکل کا ڈبہ ساتھ اسپتال لے کر جائیں۔\n3. فوری نیشنل پوائزن کنٹرول سنٹر یا ایمرجنسی وارڈ پہنچیں۔',
    instructionsSd:
      '1. زبردستي الٽي ڪرائڻ جي ڪوشش نه ڪريو.\n2. جنهن دوا يا زهر جو شڪ هجي، اها بوتل اسپتال گڏ کڻي وڃو.\n3. فوري طور ويجھي وڏي اسپتال ايمرجنسي وارڊ پهچو.',
    referralTarget: 'National Poison Control Center (JPMC Karachi) / Emergency',
  },
];

const REFUSAL_PATTERNS: RegExp[] = [
  /kitni\s*(goli|tablet|dawai|khurak)/i,
  /paracetamol\s*kitni/i,
  /panadol\s*kitni/i,
  /flagyl\s*kitni/i,
  /syrup\s*(kitna|kitni)/i,
  /dosage/i,
  /کتنی\s*گولی/i,
  /کتنی\s*خوراک/i,
  /کون\s*سی\s*دوا/i,
  /دوا\s*کتنی\s*کھائیں/i,
  /کتنے\s*چمچ/i,
  /insulin\s*kitne/i,
  /antibiotic/i,
  /amoxicillin/i,
  /ڇا\s*مان\s*هي\s*دوا\s*کائي\s*سگهان/i,
  /ڪيتري\s*دوا/i,
  /ڪيتريون\s*گوريون/i,
];

export function evaluateSafetyRules(input: string): SafetyRuleMatch {
  const text = input.trim();
  if (!text) {
    return { matched: false, type: 'safe' };
  }

  // 1. Strict Medical Dosage Refusal Check (Prioritized)
  for (const pattern of REFUSAL_PATTERNS) {
    if (pattern.test(text)) {
      return {
        matched: true,
        type: 'refusal',
        titleUr: 'طبی نسخہ یا دوا کی خوراک تجویز کرنا سخت ممنوع ہے',
        titleSd: 'طبي خوراڪ يا دوائن جو نسخو تجويز ڪرڻ منع آهي',
        instructionsUr:
          'یہ پلیٹ فارم ایک تعلیمی معاون ہے اور کسی بھی صورت میں دوائیوں کا نام، مقدار یا خوراک تجویز نہیں کر سکتا۔ نامکمل معائنے پر دی گئی دوا مریض کے لیے خطرناک یا جان لیوا ثابت ہو سکتی ہے۔\n\nبراہ کرم فوری طور پر اپنے قریبی بنیادی مرکز صحت (BHU)، دیہی ہیلتھ سنٹر (RHC) یا مستند ڈاکٹر سے رجوع کریں۔',
        instructionsSd:
          'هي ايپ تعليمي پروٽوٽائپ آهي ۽ ڪنهن به حالت ۾ دوائن جو مقدار يا خوراڪ نٿي ٻڌائي سگهي. غلط دوا مريض جي زندگي کي سخت خطري ۾ وجهي سگهي ٿي.\n\nمهرباني ڪري ويجھي اسپتال يا ڊاڪٽر سان رجوع ڪريو.',
        referralTarget: 'Nearest Basic Health Unit (BHU) / Qualified Doctor',
      };
    }
  }

  // 2. Critical Emergency Check
  for (const rule of EMERGENCY_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(text)) {
        return {
          matched: true,
          type: 'emergency',
          ruleId: rule.id,
          titleUr: rule.titleUr,
          titleSd: rule.titleSd,
          instructionsUr: rule.instructionsUr,
          instructionsSd: rule.instructionsSd,
          referralTarget: rule.referralTarget,
        };
      }
    }
  }

  return { matched: false, type: 'safe' };
}
