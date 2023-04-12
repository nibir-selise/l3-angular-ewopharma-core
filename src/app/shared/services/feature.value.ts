let features: any[] = [];

export const getFeatures = (): any[] => {
	return features;
};
export const setFeatures = (featureArray: any) => {
	features = featureArray;
};

export const deleteFeatures = () => {
	features = [];
};

export const echoFeatures = () => {};
