from django.urls import path

from . import views

urlpatterns = [
    path("selectbox-list/", views.selectbox_list_view.as_view(), name="selectBoxList"),
    path("form-list-view/", views.form_list_view.as_view(), name="selectBoxList"),
    path(
        "form-detail-view/<int:id>/",
        views.form_detail_view.as_view(),
        name="selectBoxList",
    ),
    path("form-detail-view/", views.form_detail_view.as_view(), name="selectBoxList"),
]
