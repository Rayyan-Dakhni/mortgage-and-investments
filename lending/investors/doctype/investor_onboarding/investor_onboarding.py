# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class InvestorOnboarding(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		account_type: DF.Literal["Registered", "Non-Registered"]
		advisor: DF.Link | None
		amended_from: DF.Link | None
		docusign_contract_url: DF.Data | None
		earnings_preference: DF.Literal["Payout", "Reinvest"]
		email: DF.Data | None
		funding_type: DF.Literal["Trust Company", "Direct Deposit"]
		investor_name: DF.Data
		kyc_documents: DF.Attach | None
		kyc_status: DF.Check
	# end: auto-generated types

	pass
