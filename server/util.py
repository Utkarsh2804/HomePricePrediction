import json
import pickle
import numpy as np

__locations = None
__data_col = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc = __data_col.index(location.lower())
    except:
        loc = -1

    x = np.zeros(len(__data_col))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc >= 0:
        x[loc] = 1

    return round(__model.predict([x])[0], 2)


def get_location_names():
    return __locations


def load_saved_data():
    print("Loading saved data...Started")
    global __data_col
    global __locations
    global __model
    with open("./Model_Input/columns.json", 'r') as f:
        __data_col = json.load(f)['data_columns']
        __locations = __data_col[3:]

    with open('./Model_Input/bangalore_price_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("Loading saved data...Done")


if __name__ == '__main__':
    load_saved_data()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 4))
    print(get_estimated_price('1st Phase JP Nagar', 500, 3, 6))
    print(get_estimated_price('ambilapura', 500, 3, 6))


