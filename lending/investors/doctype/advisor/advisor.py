# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Advisor(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		active: DF.Check
		advisor_name: DF.Data | None
		amended_from: DF.Link | None
		company: DF.Data | None
		email: DF.Data | None
		license_number: DF.Data | None
		phone: DF.Data | None
	# end: auto-generated types

	pass
