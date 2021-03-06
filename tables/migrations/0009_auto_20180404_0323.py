# Generated by Django 2.0.3 on 2018-04-04 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0008_remove_customer_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chef',
            name='chef_id',
        ),
        migrations.RemoveField(
            model_name='complaints',
            name='comp_id',
        ),
        migrations.RemoveField(
            model_name='compliments',
            name='comp_id',
        ),
        migrations.RemoveField(
            model_name='customer_review',
            name='review_id',
        ),
        migrations.RemoveField(
            model_name='delivery',
            name='deliver_id',
        ),
        migrations.RemoveField(
            model_name='delivery_review',
            name='review_id',
        ),
        migrations.RemoveField(
            model_name='employees',
            name='emp_id',
        ),
        migrations.RemoveField(
            model_name='menu',
            name='menu_id',
        ),
        migrations.RemoveField(
            model_name='order',
            name='order_id',
        ),
        migrations.RemoveField(
            model_name='restaurant',
            name='rest_id',
        ),
        migrations.AddField(
            model_name='chef',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='complaints',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='compliments',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer_review',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='delivery',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='delivery_review',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employees',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='menu',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='restaurant',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
