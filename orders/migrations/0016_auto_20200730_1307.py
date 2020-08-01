# Generated by Django 3.0.7 on 2020-07-30 13:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0015_auto_20200730_1248'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='city',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name='order',
            name='post_code',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='street',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AlterField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Customer',
        ),
    ]
