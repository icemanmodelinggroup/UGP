import h5py
import numpy as np
import sys
from PIL import Image
import PIL
import random
import multiprocessing
import os

def makePNG(zoomLevel, key):
	f = h5py.File('data/dataCMValues_V2.h5', 'r')
	
	matrix = f[key][:]

	f.close()
	breaksX = np.linspace(0, len(matrix[0]), num = 2**(zoomLevel-1) + 1).astype(int)
	breaksY = np.linspace(0, len(matrix), num = 2**(zoomLevel-1) + 1).astype(int)
	
	
	for y in range(0, len(breaksY)-1):
		for x in range(0, len(breaksX)-1):
			square = matrix[breaksY[y]:breaksY[y+1], breaksX[x]:breaksX[x+1]]
			
			img = Image.fromarray(square, 'RGB')
			img = img.resize((255,255), PIL.Image.ANTIALIAS)
			outFile = key + '/' + str(zoomLevel) + '/' + str(y) + '_' + str(x) + '.png'
			img.save(outFile)

	
def main(argv):
	f = h5py.File('data/dataCMValues_V2.h5', 'r')

	zoomLevels = range(9)
	keys = f.keys()
	for key in keys:
		os.mkdir(key)
		for zoomLevel in zoomLevels:
			os.mkdir(key + '/' + str(zoomLevel))
			print "Making: " + str(key)
			print "Zoom Level: " + str(zoomLevel)
			makePNG(zoomLevel, key)

	
	

if __name__ == '__main__':
	main(sys.argv)
