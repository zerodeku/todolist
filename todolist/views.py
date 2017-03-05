from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.http import HttpResponse

from models import *

# Create your views here.

def home(request):
	items = Item.objects.all()
	context = {'items': items, 'errors': []}
	return render(request, 'index.html', context)

def add_item(request):
	errors = []
	if not 'item' in request.POST or not request.POST['item']:
		errors.append("You input is empty.")
	else:
		new_item = Item(text=request.POST['item'], ip_addr=request.META['REMOTE_ADDR'])
		new_item.save()

	items = Item.objects.all()
	context = {'items': items, 'errors': errors}
	return render(request, 'index.html', context)

def delete_item(request):
	errors = []
	if not 'item_id' in request.POST:
		print "debug"
	if not 'item_id' in request.POST or not request.POST['item_id']:
		errors.append("No item specified.")
	else:
		try:
			item = Item.objects.get(id=request.POST['item_id'])
			item.delete()
		except ObjectDoesNotExist:
			errors.append("The item does not exist.")

	items = Item.objects.all()
	context = {'items': items, 'errors': errors}
	return render(request, 'index.html', context)


def get_list_json(request):
	response_text = serializers.serialize('json', Item.objects.all())
	return HttpResponse(response_text, content_type='application/json')
