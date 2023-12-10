const user = "slimsky1";
const key = "xxx";
const topicKey = "clima";
const url = `http://io.adafruit.com/api/v2/${user}/feeds/${topicKey}/data`;

function postMessage(d) {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-AIO-Key": key,
    },
    body: JSON.stringify({ datum: { value: d } }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}
