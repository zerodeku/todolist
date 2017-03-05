from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^todolist/', include('todolist.urls')),
    url(r'^$', 'todolist.views.home'),
    
    # url(r'^admin/', include(admin.site.urls)),
)
