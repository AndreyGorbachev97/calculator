import _ from 'lodash';

export const sortListInnovationRate = (list) => [...list]
  .sort((a, b) => {
    if (a.nirScaleID > b.nirScaleID) {
      return 1;
    } if (a.nirScaleID < b.nirScaleID) {
      return -1;
    }
    return 0;
  })
  .sort((a, b) => {
    if (a.nirInnovationPropertyID > b.nirInnovationPropertyID) {
      return 1;
    } if (a.nirInnovationPropertyID < b.nirInnovationPropertyID) {
      return -1;
    }
    return 0;
  });

export const minStagesData = (stages) => stages.map((stage) => ({
  id: stage.id,
  volume: stage.volume.toFixed(4),
  dateFrom: stage.dateFrom,
  dateTo: stage.dateTo,
  nirInnovationRateID: stage.nirInnovationRateID,
  labors: stage.laborVolumes.map((labor) => ({
    id: labor.id,
    volume: labor.volume.toFixed(4),
  })),
}));

export const compare = (arr1, arr2) => {
  const d1 = minStagesData(arr1);
  const d2 = minStagesData(arr2);
  const resArr = [];
  for (let i = 0; i < d1.length; i += 1) {
    resArr.push(_.isEqual(d1[i], d2[i]));
  }
  return resArr;
};
