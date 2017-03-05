from django.db import models

# Create your models here.

class Item(models.Model):
	text = models.CharField(max_length=200)
	ip_addr = models.GenericIPAddressField()

	def unicode(self):
		return self.text