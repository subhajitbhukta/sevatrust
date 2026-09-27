#!/usr/bin/env python3
"""Replace toast calls that match 'form opened' / 'modal would open here' with setFormOpen(true)."""
import re
from pathlib import Path

ADMIN_DIR = Path("/home/z/my-project/src/components/admin")

TARGETS = [
    "ActivitiesManagement.tsx", "BeneficiaryManagement.tsx", "DonationManagement.tsx",
    "CampaignManagement.tsx", "SponsorshipManagement.tsx", "VolunteerManagement.tsx",
    "EventManagement.tsx", "EnquiryManagement.tsx", "CSRManagement.tsx",
    "GrantManagement.tsx", "ExpenseManagement.tsx", "NewsManagement.tsx",
    "GalleryManagement.tsx", "DocumentsManagement.tsx", "CertificateManagement.tsx",
    "UserManagement.tsx", "NotificationsManagement.tsx",
]

# Match: onClick={() => toast({ title: "...opened..." OR description: "...modal would open..." })}
# Use flexible whitespace \s* everywhere
PATTERN_ONCLICK = re.compile(
    r'onClick=\{\(\) => toast\(\{[^}]*\}\)\}',
)

# Match: onAdd={() => toast({ ... })}
PATTERN_ONADD = re.compile(
    r'onAdd=\{\(\) => toast\(\{[^}]*\}\)\}',
)

def should_replace(toast_call: str) -> bool:
    return ("opened" in toast_call) or ("modal would open" in toast_call)

for filename in TARGETS:
    fpath = ADMIN_DIR / filename
    if not fpath.exists():
        continue
    content = fpath.read_text()
    original = content

    # Replace onClick toast calls
    def repl_onclick(m):
        if should_replace(m.group(0)):
            return 'onClick={() => setFormOpen(true)}'
        return m.group(0)
    content = PATTERN_ONCLICK.sub(repl_onclick, content)

    # Replace onAdd toast calls
    def repl_onadd(m):
        if should_replace(m.group(0)):
            return 'onAdd={() => setFormOpen(true)}'
        return m.group(0)
    content = PATTERN_ONADD.sub(repl_onadd, content)

    if content != original:
        fpath.write_text(content)
        print(f"PATCHED {filename}")
    else:
        print(f"NO CHANGE {filename}")

print("Done.")
