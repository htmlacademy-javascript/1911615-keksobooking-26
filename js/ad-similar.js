function addFilter(form, ads) {
  const similarAds = ads.slice();

  return {
    setSelectFilter(filter) {
      if (form.filter.value === 'any') {
        return similarAds;
      }
      return similarAds.filter((ad) => ad.offer.filter === form.filter.value);
    },
    SetMaxAds(maxAds) {
      return similarAds.slice(0, maxAds);
    },
    similarAds
  };
}

export default addFilter;

