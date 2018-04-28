# Generated by Django 2.0.3 on 2018-04-28 18:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0037_auto_20180428_1836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='chef',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='chef',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Restaurant'),
        ),
        migrations.AlterField(
            model_name='complaints',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='complaints',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='compliments',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='compliments',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='customer_restaurant',
            name='rest_id',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='customer_restaurant',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='customer_review',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='customer_review',
            name='order_number',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Order'),
        ),
        migrations.AlterField(
            model_name='customer_review',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Restaurant'),
        ),
        migrations.AlterField(
            model_name='delivery_review',
            name='emp_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Employees'),
        ),
        migrations.AlterField(
            model_name='delivery_review',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Customer'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='chef_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Chef'),
        ),
        migrations.AlterField(
            model_name='order',
            name='menu_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Menu'),
        ),
        migrations.AlterField(
            model_name='order',
            name='rest_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tables.Restaurant'),
        ),
    ]
