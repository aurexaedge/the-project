//! this cuts the text leaving 70 characters to be displayed
export const cutText = (str) => {
  if (str?.length > 45) {
    str = str?.substring(0, 70) + '...';
  }
  return str;
};

//! this formats the text if you added value to the database using textArea
export const replaceWithBr = (value) => {
  let str = value;
  let result = str?.split('\n');
  return result?.map((i, key) => (
    <p style={{ fontSize: '13px', opacity: '0.9' }} key={key}>
      {i + '\n'}
    </p>
  ));
};

//! this cuts the text leaving 11 characters to be displayed
export const cutTextTo11 = (str) => {
  if (str?.length > 13) {
    str = str?.substring(0, 11) + '...';
  }
  return str;
};
//! this cuts the text leaving 21 characters to be displayed
export const cutTextTo21 = (str) => {
  if (str?.length > 13) {
    str = str?.substring(0, 21) + '...';
  }
  return str;
};
