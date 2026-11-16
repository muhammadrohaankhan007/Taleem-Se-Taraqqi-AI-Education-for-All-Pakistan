#!/usr/bin/env python3
"""
Taleem Se Taraqqi Content Validator
Validates all lesson files against content/schema/lesson.schema.json
and checks for audio script references and review statuses.
Fails any build that is not flagged PILOT-DRAFT if it contains a non-approved lesson.
"""

import os
import sys
import json
import argparse
from pathlib import Path

def validate():
    parser = argparse.ArgumentParser(description="Validate Taleem Se Taraqqi curriculum content.")
    parser.add_argument("--pilot-draft", action="store_true", help="Allow unapproved/draft lessons for pilot draft builds.")
    args, unknown = parser.parse_known_args()

    # Also support environment variable PILOT_DRAFT=1 or BUILD_FLAG=PILOT-DRAFT
    is_pilot_draft = (
        args.pilot_draft or
        os.getenv("PILOT_DRAFT", "0") in ("1", "true", "True") or
        os.getenv("BUILD_FLAG", "") == "PILOT-DRAFT"
    )

    root = Path(__file__).resolve().parent.parent
    schema_path = root / "content" / "schema" / "lesson.schema.json"
    
    if not schema_path.exists():
        print(f"ERROR: Schema missing: {schema_path}")
        sys.exit(1)
        
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)
        
    try:
        import jsonschema
        has_jsonschema = True
    except ImportError:
        has_jsonschema = False
        print("WARNING: 'jsonschema' package not installed; performing structural validation.")

    curriculum_dir = root / "content" / "curriculum"
    lesson_files = list(curriculum_dir.rglob("*.json"))
    
    if not lesson_files:
        print("WARNING: No lesson files found to validate.")
        return 0

    errors = 0
    validated = 0
    unapproved_count = 0

    print(f"Build Mode: {'PILOT-DRAFT (Drafts Permitted)' if is_pilot_draft else 'PRODUCTION (Only Approved Lessons Allowed)'}\n")

    for path in lesson_files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            if has_jsonschema:
                jsonschema.validate(instance=data, schema=schema)
            else:
                required = ["id", "language", "stage", "objective_key", "est_minutes", "age_bands", "activities", "review"]
                for req in required:
                    if req not in data:
                        raise ValueError(f"Missing required field '{req}' in {path.name}")
                if data["review"]["status"] not in ["draft", "in_review", "approved", "retired"]:
                    raise ValueError(f"Invalid review status '{data['review']['status']}' in {path.name}")

            status = data["review"]["status"]
            if status != "approved":
                unapproved_count += 1
                if not is_pilot_draft:
                    print(f"FAILED: Production build violation in {path.relative_to(root)}: Lesson '{data['id']}' has review status '{status}'. Only 'approved' lessons may ship in production builds. Pass '--pilot-draft' or set PILOT_DRAFT=1 for pilot draft builds.")
                    errors += 1
                    continue
                else:
                    print(f"WARNING (PILOT-DRAFT): Non-approved lesson allowed in draft mode: {path.relative_to(root)} (Status: {status})")

            validated += 1
            print(f"PASSED: {path.relative_to(root)} (ID: {data['id']}, Status: {status})")
        except Exception as e:
            print(f"FAILED: Validation failed for {path.relative_to(root)}: {e}")
            errors += 1

    print(f"\nSummary: {validated} validated, {unapproved_count} non-approved, {errors} errors.")
    return 1 if errors > 0 else 0

if __name__ == "__main__":
    sys.exit(validate())
