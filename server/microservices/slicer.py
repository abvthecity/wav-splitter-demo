# Slicer microservice, python side
# Andrew Jiang
import os, sys
from splitterkit import readwave, writewave, slicewave_s

# define arguments
src = sys.argv[1]
dest = sys.argv[2]
start = sys.argv[3]
end = sys.argv[4]

# perform slicing
rawdata = readwave(src)
sliced = slicewave_s(rawdata, start, end)
files = writewave(dest, sliced)

# output system file
fn = files[0]
os.path.abspath(fn)
return files[0]
