# Generated by Django 3.0.7 on 2020-07-29 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_auto_20200729_1425'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order_Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dishType', models.CharField(max_length=32)),
                ('note', models.TextField(blank=True)),
                ('price', models.FloatField(null=True)),
            ],
        ),
        migrations.RenameModel(
            old_name='Cart',
            new_name='Order',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
        migrations.AddField(
            model_name='order_entry',
            name='order_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Order'),
        ),
    ]
