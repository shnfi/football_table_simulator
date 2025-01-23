const body = document.querySelector("body");
const table = document.querySelector(".table");
const fixtures = document.querySelector(".fixtures");

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

const first_fixture = document.createElement("div");
first_fixture.className = "fixture";
first_fixture.style.backgroundColor = "rgb(255, 75, 68)";
first_fixture.style.color = "white";
first_fixture.style.height = "0";

const first_fixture_at_end = document.createElement("p");
first_fixture_at_end.className = "fixture-at-end";
first_fixture_at_end.innerText = teams[0].name;

first_fixture.appendChild(first_fixture_at_end);
fixtures.appendChild(first_fixture);

for (let i = 0; i < 20; i++)
{
    for (let j = 0; j < 20; j++)
    {
        if (teams[i].name != teams[j].name)
        {
            let possiblelity_array = []; 

            for (let k = 0; k < teams[i].power; k++)
                possiblelity_array.push(1);

            for (let l = 0; l < teams[j].power; l++)
                possiblelity_array.push(2);

            const choice = Math.floor(Math.random() * (possiblelity_array.length - 1))

            var condition;

            let t1_goals = Math.floor(Math.random() * 7);
            let t2_goals = Math.floor(Math.random() * 7);

            if (possiblelity_array[choice] == 1)
                condition = t1_goals > t2_goals;
            else
                condition = t1_goals < t2_goals;

            while (!condition)
            {
                t1_goals = Math.floor(Math.random() * 7);
                t2_goals = Math.floor(Math.random() * 7);

                if (possiblelity_array[choice] == 1)
                    condition = t1_goals > t2_goals;
                else
                    condition = t1_goals < t2_goals;
            }

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

            /* 
             * creating the row step by step
             */

            // fixture

            var fixture;
            var fixture_at_end;

            if (j == 19)
            {
                fixture = document.createElement("div");
                fixture.className = "fixture";
                fixture.style.backgroundColor = "rgb(255, 75, 68)";
                fixture.style.color = "white";
                fixture.style.height = "0";
                
                fixture_at_end = document.createElement("p");
                fixture_at_end.className = "fixture-at-end";
                fixture_at_end.innerText = teams[i + 1].name;
            }
            else 
            {
                fixture = document.createElement("div");
                fixture.className = "fixture";
                fixture.style.height = "2rem";

                if (t1_goals > t2_goals)
                    fixture.style.backgroundColor = "rgba(50, 222, 133, 0.50";

                else if (t1_goals == t2_goals)
                    fixture.style.backgroundColor = "rgb(169, 169, 169, 0.50";

                else if (t1_goals < t2_goals)
                    fixture.style.backgroundColor = "rgb(253, 92, 99, 0.50";
            }

            // team 1 pic

            const team1_pic = document.createElement("div");
            team1_pic.className = "team-pic";

            const team1_pic_img = document.createElement("img");
            team1_pic_img.src = teams[visual_table[i].id].badge;

            // team 1 name 

            const team1_name = document.createElement("div");
            team1_name.className = "team-name";

            const team1_name_p = document.createElement("p");
            team1_name_p.innerHTML = teams[visual_table[i].id].name;

            // result

            const result = document.createElement("div");
            result.className = "result";

            const result_p = document.createElement("p");
            result_p.innerHTML = `${t1_goals} - ${t2_goals}`;

            // team 2 name 

            const team2_name = document.createElement("div");
            team2_name.className = "team-name";

            const team2_name_p = document.createElement("p");
            team2_name_p.innerHTML = teams[visual_table[j].id].name;

            // team 2 pic

            const team2_pic = document.createElement("div");
            team2_pic.className = "team-pic";

            const team2_pic_img = document.createElement("img");
            team2_pic_img.src = teams[visual_table[j].id].badge;

            // appending step

            team1_pic.appendChild(team1_pic_img);
            team1_name.appendChild(team1_name_p);
            result.appendChild(result_p);
            team2_name.appendChild(team2_name_p);
            team2_pic.appendChild(team2_pic_img);
            
            if (j == 19)
            {
                fixture.appendChild(fixture_at_end);
            }
            else
            {
                fixture.appendChild(team1_pic);
                fixture.appendChild(team1_name);
                fixture.appendChild(result);
                fixture.appendChild(team2_name);
                fixture.appendChild(team2_pic);
            }

            fixtures.appendChild(fixture);
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

/*
 * showig the 'simulate' button at the startup
 */

// disabling the scroll in the starting screen because of a bug

body.style.overflow = "hidden";

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
        body.style.overflow = "scroll";
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
    
    const col_pos_color = document.createElement("div");
    col_pos_color.className = "col-pos-color";
    
    if (i == 0 || i == 1 || i == 2 || i == 3)
        col_pos_color.style.backgroundColor = "blue";

    else if (i == 4)
        col_pos_color.style.backgroundColor = "orange";

    else if (i == 5)
        col_pos_color.style.backgroundColor = "green";

    else if (i == 17 || i == 18 || i == 19)
        col_pos_color.style.backgroundColor = "red";


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

    if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 17 || i == 18 || i == 19)
        col_pos.appendChild(col_pos_color);

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