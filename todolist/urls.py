from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'todolist.views.home'),
    url(r'^add-item$', 'todolist.views.add_item'),
 	url(r'^delete-item$', 'todolist.views.delete_item'),
 	url(r'^get-list-json$', 'todolist.views.get_list_json')
)