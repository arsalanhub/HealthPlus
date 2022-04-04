// "https://www.worldtides.info/api/v3?heights&date=2022-04-03&lat=33.768321&lon=-118.195617&key=0f35b63e-daae-4084-ab76-13323f49bba4";
// lat = 33.768321
// lon = -118.195617

// lat = 52.967
// lon = 4.75

async function getValue() {
  let lat = document.getElementById("lat").value;
  let lon = document.getElementById("lon").value;
  console.log(lat);
  console.log(lon);
  let url = `https://www.worldtides.info/api/v3?heights&date=2022-04-03&lat=${lat}&lon=${lon}&key=0f35b63e-daae-4084-ab76-13323f49bba4`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function fun() {
  let values = await getValue();
  let container = document.querySelector(".container");

  let span = document.createElement("span");
  console.log(values.atlas);

  span.innerText = values.atlas;

  container.appendChild(span);

  // JSON.parse;
  values.heights.forEach((value) => {
    console.log(value.height);
  });
}

// const fun = () => {
//   fetch(
//     "https://www.worldtides.info/api/v3?heights&date=2022-04-03&lat=33.768321&lon=-118.195617&key=0f35b63e-daae-4084-ab76-13323f49bba4"
//   )
//     .then((res) => {
//       let values = res.json();
//       //   console.log(values);
//       values.forEach((value) => {
//         console.log(value);
//       });
//     })
//     .then((data) => {
//       console.log(data);
//     });
// };
