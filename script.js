const pipeContainer = document.getElementsByClassName("pipe-container")[0];

startSorting();

async function startSorting() {
    while (pipeContainer.lastElementChild) {
        pipeContainer.removeChild(pipeContainer.lastElementChild);
    }

    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

    const count = document.getElementById("count").value;

    let sortList = new Array(count);
    for (let i = 0; i <= count; i++) {
        sortList[i] = Math.random();
    }

    for (let i = 0; i <= count; i++) {
        addPipe(pipeContainer, i, sortList[i]);
    }

    const speed = document.getElementById("speed").value;
    visualize(sortList, speed);
}

async function visualize(sortList, speed) {
    const sortedList = mergeSort(sortList);
    let compareList = [...sortList];
    let done = false;

    while (!done) {
        const next = sortedList.next();
        done = next.done;
        if (done) continue;

        let pos1 = -1;
        let pos2 = -1;

        for (let i = 0; i <= next.value.length - 1; i++) {
            if (next.value[i] !== compareList[i]) {
                if (pos1 < 0) pos1 = i;
                else pos2 = i;
            }
        }

        if (pos1 !== -1 && pos2 !== -1) {
            const pipe1 = document.getElementById(`pipe_${pos1}`);
            const pipe2 = document.getElementById(`pipe_${pos2}`);

            pipe1.style.backgroundColor = "#00FF00";
            pipe2.style.backgroundColor = "#00FFFF";
            await new Promise((resolve) => setTimeout(resolve, speed));

            pipe1.style.height = `${Math.round(600 * next.value[pos1])}px`;
            pipe2.style.height = `${Math.round(600 * next.value[pos2])}px`;
            await new Promise((resolve) => setTimeout(resolve, speed));

            pipe1.style.backgroundColor = "#666";
            pipe2.style.backgroundColor = "#666";
        }

        compareList = [...next.value];
    }
}

function* bubbleSort(unsortedList) {
    let list = [...unsortedList];
    for (let i = 0; i <= list.length - 1; i++) {
        for (let j = 0; j <= list.length - 2 - i; j++) {
            if (list[j] > list[j + 1]) {
                const temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
                yield list;
            }
            yield list;
        }
    }
}

function* mergeSort(unsortedList) {
    let list = [...unsortedList.map(i => [i])];

    while (list.length > 1) {
        let tempList = [];
        for (let i = 0; i <= list.length - 2; i += 2) {
            if (list[i][0] < list[i + 1][0]) {
                tempList = [...tempList, [...list[i], ...list[i + 1]]];
            } else {
                tempList = [...tempList, [...list[i + 1], ...list[i]]];
            }
        }

        if (list.length % 2 !== 0) {
            tempList = [...tempList, list[list.length - 1]];
        }

        list = tempList;
        yield list;
    }

    yield list;
}

function addPipe(element, id, height) {
    const div = document.createElement("div");
    div.style.width = "5px";
    div.style.height = `${Math.round(600 * height)}px`;
    div.style.border = "1px solid black";
    div.style.backgroundColor = "#666";
    div.style.float = "left";
    div.id = `pipe_${id}`;
    element.appendChild(div);
}