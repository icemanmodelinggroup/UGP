from django.db import models
# from django.core.validators import int_list_validator
# import time
import h5py
import numpy as np
import sys
from pylab import sqrt, linspace
from scipy.interpolate import RectBivariateSpline
import json


# Create your models here.

class Dataset(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)

    def __str__(self):
        return self.name

    def push(self):
        self.save()




class DataPoint(models.Model):
    data = models.DecimalField()
    parentDset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name='Data_Points')

#Everything past here makes sense until...
from QSSICode.createDatasets import createInitialDatasets
datasetDict = createInitialDatasets()
listSets = ['velocity','smb','bed','surface',
                'thickness','t2m','VX','VY']
for dict in datasetDict:
    dataset = Dataset.objects.create(name=dict)
    #...Here. This is where I am struggling
    for point in dict[listSets[]:
        DataPoint.objects.create(dataset=dataset, data = point[0])