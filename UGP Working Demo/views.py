from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from QSSICode.createDatasets import createInitialDatasets
from QSSICode.translation import LonLatToProj, ProjToLatLon
from QSSICode.createFlowline import Flowline
from QSSICode.getDataValues import Point
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.cache import cache


# Create your views here.
#---------------------------

#This view sends the user to the landing/home page
def display_home(request):
    return render(request, 'UGP/index.html',{})

@csrf_exempt
def get_point_data(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        long = json_data['lon']
        lat = json_data['lat']

        lonLatTrans = LonLatToProj([[long, lat]])

        datasetDict = createInitialDatasets()
        interp_point = Point(datasetDict, lonLatTrans.xPoints, lonLatTrans.yPoints)
        #json_pointdata = {interp_point.dataValues}

        return JsonResponse(interp_point.dataValues)

    else: return HttpResponse("This is not a POST request")


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
        distance = 300
        #resolution 1000

    #Translator for lon,lat to x,y
        lonLatTrans = LonLatToProj([[long, lat]])

    # create datasets; this is temporary until I find a way to store it
        myDatasetDict = createInitialDatasets()
        # myDatasetDict = cache.get('myDict')
        # print(myDatasetDict)

    # put translated point into flowline
        initialFlowline = Flowline(lonLatTrans.xPoints[0], lonLatTrans.yPoints[0], myDatasetDict, distance)

    # Translate points back to lat,long
        xyTrans = ProjToLatLon(initialFlowline.flowLine)

    # dump flowline into JSONResponse (Serialize the dict)
        flowLinePoints = {'lon':xyTrans.lonPoints,'lat':xyTrans.latPoints}

    #Send the JSON back
        return JsonResponse(flowLinePoints)

    else: return(HttpResponse("This is not a POST Request"))
