entire = $(
  "#content > div.boardGroup > div.conTableGroup.MAB30 > table > tbody > tr > td"
);
tds = Object.values(entire.filter((idx, val) => idx % 3 == 1));
tds.map((data) => {
  try {
    const childNodes = data?.childNodes;
    const text = childNodes[0].text;
    return text;
  } catch (err) {
    return null;
  }
});
