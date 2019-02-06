import sys
from QSSICode.support.FlowIntegrator import FlowIntegrator

class Flowline():
    def __init__(self, xStart, yStart, datasetDict, distance):
        self.distance = distance
        myIntegrator = FlowIntegrator(datasetDict['VX'], datasetDict['VY'])

        self.flowLine = []
        for x in range(0, self.distance):
            self.flowLine.append(None)

        self.flowLine[0] = [xStart, yStart]
        self.flowLine = myIntegrator.integrate(xStart, yStart, self.flowLine, 0, 1000)

        if (None in self.flowLine):
            print("Integration Error try again with new x, y")

if __name__ == '__main__':
    latPoint = 69.87
    longPoint = -47.01



    from QSSICode.translation import LonLatToProj

    myTranslator = LonLatToProj([[longPoint, latPoint]])

    from QSSICode.createDatasets import createInitialDatasets

    myDatasetDict = createInitialDatasets()

    myFlowline = Flowline(myTranslator.xPoints[0], myTranslator.yPoints[0], myDatasetDict, 100)

    print(myFlowline.flowLine)
    print(myFlowline.flowLine[0])
    print(myFlowline.flowLine[1])
