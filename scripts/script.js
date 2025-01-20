const body = document.querySelector("body");
const table = document.querySelector(".table");

/*
 * creating the visul table
 */

var visual_table = [];

for (let i = 0; i < 20; i++)
{
    visual_table[i] = {
        "id": i,
        "pt": 0
    }
}

/*
 * randomize the result of all games
 */

for (let i = 0; i < 20; i++)
{
    for (let j = 0; j < 20; j++)
    {
        let t1_goals = Math.floor(Math.random() * 7);
        let t2_goals = Math.floor(Math.random() * 7);

        if (t1_goals > t2_goals)
        {
            visual_table[i].pt += 3;
        }
        else if (t1_goals == t2_goals)
        {
            visual_table[i].pt += 1;
            visual_table[j].pt += 1;
        }
        else if (t1_goals < t2_goals)
        {
            visual_table[j].pt += 3;
        }
    }
}

/*
 * sorting the visual table by the 'pt' value using the 
 */

for (let i = 0; i < 19; i++)
{
    for (let j = 0; j < 19; j++)
    {
        if (visual_table[j].pt < visual_table[j + 1].pt)
        {
            let tmp = visual_table[j];
            visual_table[j] = visual_table[j + 1];
            visual_table[j + 1] = tmp;
        }
    }
}

for (let i = 0; i < 20; i++)
    console.log(teams[visual_table[i].id].name + " " + visual_table[i].pt);

/*
 * showig the 'simulate' button at the startup
 */

// screen creation 

const starting_screen = document.createElement("div");
starting_screen.className = "starting_screen";

body.appendChild(starting_screen);

// button creation 

const simulate_button = document.createElement("button");
simulate_button.innerHTML = "Simulate!";
simulate_button.className = "simulate_button";

simulate_button.addEventListener("click", () => {
    starting_screen.style.opacity = "0";
    simulate_button.style.opacity = "0";
    
    setTimeout(() => {
        body.removeChild(starting_screen);
        body.removeChild(simulate_button);
    }, 400);
})

body.appendChild(simulate_button);

/*
 * inserting clubs to the table
 */

for (let i = 0; i < 20; i++)
{
    /* 
     * creating the row step by step
     */

    // row

    const row = document.createElement("div");
    row.className = "row";

    // col pos

    const col_pos = document.createElement("div");
    col_pos.className = "col-pos";

    const col_pos_p = document.createElement("p");
    col_pos_p.innerHTML = i + 1;

    // col pic

    const col_pic = document.createElement("div");
    col_pic.className = "col-pic";

    const col_pic_img = document.createElement("img");
    col_pic_img.src = teams[visual_table[i].id].badge;

    // col name

    const col_name = document.createElement("div");
    col_name.className = "col-name";

    const col_name_p = document.createElement("p");
    col_name_p.innerHTML = teams[visual_table[i].id].name;

    // col info

    const col_info = document.createElement("div");
    col_info.className = "col-info";

    // col info pl

    const col_info_pl = document.createElement("div");
    col_info_pl.className = "col-info-pl";

    const col_info_pl_p = document.createElement("p");
    col_info_pl_p.innerHTML = "38";

    // col info pt

    const col_info_pt = document.createElement("div");
    col_info_pt.className = "col-info-pt";

    const col_info_pt_p = document.createElement("p");
    col_info_pt_p.innerHTML = visual_table[i].pt;

    // appending step

    col_pos.appendChild(col_pos_p);
    col_pic.appendChild(col_pic_img);
    col_name.appendChild(col_name_p);
    col_info_pl.appendChild(col_info_pl_p);
    col_info_pt.appendChild(col_info_pt_p);
    col_info.appendChild(col_info_pl);
    col_info.appendChild(col_info_pt);
    row.appendChild(col_pos);
    row.appendChild(col_pic);
    row.appendChild(col_name);
    row.appendChild(col_info);
    table.appendChild(row);
}