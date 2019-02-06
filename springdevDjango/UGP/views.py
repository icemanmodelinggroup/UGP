from django.shortcuts import render
from django.http import JsonResponse
import json


# Create your views here.
def get_flowline(request):
    # process JSON xy points
    json_data = json.loads(request.body.decode('utf-8'))
    lat =json_data[0]
    long=json_data[1]

    from QSSICode.translation import LonLatToProj
    lonLatTrans = LonLatToProj([[long, lat]])

    # create/grab dataset
    #

    # put translated point into flowline
    from QSSICode.createFlowline import Flowline
    flowLineResponse = Flowline()

    #Translate points back to lat,long

    #dump flowline into JSONResponse

    #data = myFlowline.flowLine ??
    #return JsonResponse(data) ??



    return JsonResponse(flowLinePoints)
