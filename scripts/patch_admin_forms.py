#!/usr/bin/env python3
"""Patch all admin modules to wire in the FormDialog component.

Each module currently has:
  const { toast } = useToast();
  ...
  onClick={() => toast({ title: "X form opened", description: "..." })}

We replace with:
  const [formOpen, setFormOpen] = useState(false);
  ...
  onClick={() => setFormOpen(true)}
  ...
  <FormDialog open={formOpen} onOpenChange={setFormOpen} schema={X_FORM_SCHEMA} />
"""
import re
import sys
from pathlib import Path

ADMIN_DIR = Path("/home/z/my-project/src/components/admin")

# Map: file basename → (component import name, schema constant, state var name)
MODULES = [
    ("ActivitiesManagement.tsx", "ACTIVITY_FORM_SCHEMA", "Add Activity"),
    ("BeneficiaryManagement.tsx", "BENEFICIARY_FORM_SCHEMA", "Add Beneficiary"),
    ("DonationManagement.tsx", "DONATION_FORM_SCHEMA", "Record Manual Donation"),
    ("CampaignManagement.tsx", "CAMPAIGN_FORM_SCHEMA", "New Campaign"),
    ("SponsorshipManagement.tsx", "SPONSORSHIP_FORM_SCHEMA", "Add Sponsorship"),
    ("VolunteerManagement.tsx", "VOLUNTEER_FORM_SCHEMA", "Add Volunteer"),
    ("EventManagement.tsx", "EVENT_FORM_SCHEMA", "Create Event"),
    ("EnquiryManagement.tsx", "ENQUIRY_FORM_SCHEMA", "Record Enquiry"),
    ("CSRManagement.tsx", "CSR_FORM_SCHEMA", "Add Partner"),
    ("GrantManagement.tsx", "GRANT_FORM_SCHEMA", "Add Grant"),
    ("ExpenseManagement.tsx", "EXPENSE_FORM_SCHEMA", "Add Expense"),
    ("NewsManagement.tsx", "NEWS_FORM_SCHEMA", "New Article"),
    ("GalleryManagement.tsx", "GALLERY_FORM_SCHEMA", "Add Item"),
    ("DocumentsManagement.tsx", "DOCUMENT_FORM_SCHEMA", "Add Document"),
    ("CertificateManagement.tsx", "CERTIFICATE_FORM_SCHEMA", "Generate Certificate"),
    ("UserManagement.tsx", "USER_FORM_SCHEMA", "Add User"),
    ("NotificationsManagement.tsx", "NOTIFICATION_FORM_SCHEMA", "Compose Notification"),
]

for filename, schema_const, button_label in MODULES:
    fpath = ADMIN_DIR / filename
    if not fpath.exists():
        print(f"SKIP {filename} (not found)")
        continue
    content = fpath.read_text()
    original = content

    # 1. Add imports for FormDialog and the schema (if not present)
    if "FormDialog" not in content:
        # Insert after the last `import ... from` line
        last_import_match = list(re.finditer(r'^import [^\n]+ from "[^"]+";\s*$', content, re.MULTILINE))
        if last_import_match:
            insert_pos = last_import_match[-1].end()
            import_line = f'\nimport {{ FormDialog }} from "@/components/shared/FormDialog";\nimport {{ {schema_const} }} from "@/components/shared/form-schemas";'
            content = content[:insert_pos] + import_line + content[insert_pos:]

    # 2. Add useState import if missing
    if "useState" not in content:
        # Replace `import { useState } from "react"` — add it after the first import
        content = re.sub(
            r'("use client";\s*\n)',
            r'\1import { useState } from "react";\n',
            content,
            count=1
        )
    elif "import { useState }" not in content and "useState," not in content:
        # Maybe there's `import { useState } from "react"` somewhere already, otherwise add it
        if "useState" in content:
            # already imported, skip
            pass
        else:
            content = re.sub(
                r'("use client";\s*\n)',
                r'\1import { useState } from "react";\n',
                content,
                count=1
            )

    # 3. Add formOpen state right after useToast() destructuring
    if "formOpen" not in content:
        # Find `const { toast } = useToast();` and add state after it
        content = re.sub(
            r'(const \{ toast \} = useToast\(\);)',
            r'\1\n  const [formOpen, setFormOpen] = useState(false);',
            content,
            count=1
        )

    # 4. Replace all "form opened" toast calls with setFormOpen(true)
    # Pattern: onClick={() => toast({ title: "X form opened", description: "..." })}
    # We need to be careful — only the ones that match button_label
    # Use a more general approach: replace ALL toast() calls whose title contains "opened" or "form opened"
    pattern = re.compile(
        r'onClick=\{\(\) => toast\(\{[^}]*"opened"[^}]*\}\)\}',
        re.DOTALL
    )
    content = pattern.sub('onClick={() => setFormOpen(true)}', content)

    # Also handle the variant where the toast description contains "modal would open here"
    pattern2 = re.compile(
        r'onClick=\{\(\) => toast\(\{[^}]*"modal would open here"[^}]*\}\)\}',
        re.DOTALL
    )
    content = pattern2.sub('onClick={() => setFormOpen(true)}', content)

    # Also handle "onAdd" pattern in DataTable — when onAdd calls toast
    # The DataTable passes onAdd as a prop callback
    # In some files: onAdd={() => toast({ title: "X form opened", ... })}
    pattern3 = re.compile(
        r'onAdd=\{\(\) => toast\(\{[^}]*"opened"[^}]*\}\)\}',
        re.DOTALL
    )
    content = pattern3.sub('onAdd={() => setFormOpen(true)}', content)

    # 5. Add <FormDialog .../> JSX before the closing </div> of the main wrapper
    # Find the LAST `</div>\n  );\n}` pattern (the closing of the component return)
    if "FormDialog" not in content.split("export function")[1] if "export function" in content else True:
        pass  # Already handled above

    if "<FormDialog " not in content:
        form_dialog_jsx = f'\n      <FormDialog open={{formOpen}} onOpenChange={{setFormOpen}} schema={{{schema_const}}} />\n'
        # Insert before the final closing </div> of the root component
        # Find the LAST closing div before `);` in the function body
        # We look for `</div>\n    );` and inject before it
        content = re.sub(
            r'(</div>\s*\n\s*\);\s*\n\s*\})',
            form_dialog_jsx + r'\1',
            content,
            count=1,
        )

    if content != original:
        fpath.write_text(content)
        print(f"PATCHED {filename}")
    else:
        print(f"NO CHANGE {filename}")

print("Done.")
