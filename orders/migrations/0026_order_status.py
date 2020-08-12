# Generated by Django 3.0.7 on 2020-08-09 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0025_auto_20200804_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('PD', 'Pending'), ('IP', 'In_Progress'), ('DL', 'Delivering'), ('RC', 'Received')], default='PD', max_length=2),
        ),
    ]
