from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from QSSICode.createDatasets import createInitialDatasets
from QSSICode.translation import LonLatToProj, ProjToLatLon
from QSSICode.createFlowline import Flowline
from django.views.decorators.csrf import csrf_exempt
import json
import sys


# Create your views here.
#---------------------------

#This view sends the user to the landing/home page
def display_home(request):
    return render(request, 'UGP/map_index.html',{})

#This view recieves x,y coords from map via JSON
#then sends back the shear margin arrays in long,lat format
@csrf_exempt
def get_flowline(request):
    #If POST then generate the flowline
    if request.method == 'POST':
        print("Received!")
        print("Processing Flowline!")
    # process JSON xy points (Deserialize JSON)
        json_data = json.loads(request.body)
        long = json_data['long']
        lat = json_data['lat']
        distance = json_data['dist']

    #Translator for lon,lat to x,y
        lonLatTrans = LonLatToProj([[long, lat]])

    # create datasets; this is temporary until I find a way to store it
        myDatasetDict = createInitialDatasets()

    # put translated point into flowline
        initialFlowline = Flowline(lonLatTrans.xPoints[0], lonLatTrans.yPoints[0], myDatasetDict, distance)

    # Translate points back to lat,long
        xyTrans = ProjToLatLon(initialFlowline.flowLine)

    # dump flowline into JSONResponse (Serialize the dict)
        flowLinePoints = {'lon':xyTrans.lonPoints,'lat':xyTrans.latPoints}

    #Send the JSON back
        return JsonResponse(flowLinePoints)

    else: return(HttpResponse("This is not a POST Request"))
