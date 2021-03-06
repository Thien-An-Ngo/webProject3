# Generated by Django 3.0.7 on 2020-07-11 13:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0005_auto_20200628_1216'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateField(blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='dish',
            name='prizeLarge',
            field=models.FloatField(max_length=8, null=True),
        ),
        migrations.AlterField(
            model_name='dish',
            name='prizeSmall',
            field=models.FloatField(max_length=8, null=True),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dishType', models.CharField(max_length=32)),
                ('extra_information', models.TextField(blank=True)),
                ('cart_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Cart')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=64)),
                ('post_code', models.IntegerField(max_length=8)),
                ('street', models.CharField(max_length=64)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='cart',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Customer'),
        ),
    ]
