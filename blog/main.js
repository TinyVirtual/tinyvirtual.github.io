let presets = {
    post: `<div class="post"><div class="post-main">
            $IMAGE
            <div class="post-div"><div class="post-text">
                <a class="post-title" href="$LINK">$TITLE</a>
                <a class="post-desc">$DESC</a></div>
                <span class="post-stats">$DATE</span>
            </div></div><div class="post-extra"><div class="post-details"><img class="pfp-img" src="$PFP" alt="Post image"><a class="a-link" $USRPAGE>by $USER</a></div></div>
        </div>`,
    post_image: `<img class="post-img" src="$SOURCE" alt="Post image">`,
    page_nav: `<div class="page-selector">
                   <span class="selector-span">
                       <a class="page-link" $LESS>
                           &lt;
                       </a>
                       
                       Page $NUMBER 
                       
                       <a class="page-link" $MORE>
                           &gt;
                       </a>
                   </span>
               </div>`,
    blogpost: `
    <div class="blogpost">
        <div class="blogpost-header">
            <div class="post-details">
                <img class="pfp-img" src="$PFP" alt="Post image">
                <a class="a-link" href="$USRPAGE">
                    by $USER
                </a>
            </div>
            <p class="blogpost-title" id="blogpost_title">
                $TITLE
            </p>
        </div>
        <div class="blogpost-content-div" id="blogpost_content">
            $CONTENT
        </div>
        <div class="blogpost-info">
            <p id="blogpost_date">
                Posted on $DATE
            </p>
            <div class="blogpost-actions-container">
                <a id="share_button">
                    Share
                </a>
            </div>
        </div>
    </div>`,
    err: `<div class="err-div">
            <h1 class="err-h1">Uh oh...</h1>
            <p class="err-p">An error has occured while loading this page!</p>
            <p class="err-p">Error: $ERROR</p>
            <a href="?page=0" class="a-button">Go back to start</a>
        </div>`,
    page_unav: `<div class="blogpost"><div class="center-div">
            <h1>Page unavaliable: $ERR</h1>
            <a class="a-button" href="?page=0">Go back to start</a>
        </div></div>`,
        
    user_unav: `<div class="blogpost"><div class="center-div">
            <h1>Unregistered User: $USER</h1>
            <p>This user hasn't been registered or does not exists</p>
            <a class="a-button" href="?page=0">Go back to start</a>
        </div></div>`,

    user_box: `
    <div class="user-box">
        <div class="left-user-box">
        <div class="user-pfp"><img class="pfp-img" src="$SOURCE" alt="Profile Picture"></div><div class="user-contents"><a class="username-title username-title-margin" href="$USRPAGE">$DISPLAYNAME</a>
        <h6>@$USERNAME</h6></div>
        </div>
    </div>`,
    
    user_box_page: `
    <div class="user-box">
        <div class="left-user-box">
        <div class="user-pfp"><img class="pfp-img" src="$SOURCE" alt="Profile Picture"></div><div class="user-contents"><a class="username-title-black">$DISPLAYNAME</a>
        <h6>@$USERNAME</h6>$CONTENTS</div>
        </div>
    </div>`,
    users_container: `<div class="users-container"><h1 class="box-title">Users:</h1>
        $USERS
    </div>`,
    privacy: `<div class="blogpost">
        <div class="terms-header">
            
            <p class="blogpost-title" id="blogpost_title">Terms and Privacy</p>
        </div>
        <div class="privacy-content-div" id="blogpost_content">
            $CONTENT
        </div>
        <div class="blogpost-info">
            <p id="blogpost_date">Last Update: $UPDATED</p>
            
        </div>
    </div>`

}


let containers = {
    content : () => document.getElementById("content"),
    selector : () => document.getElementById("page_selector"),
}

function elementFromXml(xml_string){
    var ret = document.createElement("div")
    ret.innerHTML = xml_string
    return ret.children[0]//.firstChild
}

let params = new URLSearchParams(window.location.search)

async function load_amount(){
    if(!localStorage.getItem("page_amount")){
        var temp_req = await fetch("https://api.github.com/repos/TinyVirtual/tinyvirtual.github.io/contents/blog/posts/")
        var post_qt = (await temp_req.json()).length-2
        localStorage.setItem("page_amount",JSON.stringify(
          {
            max: post_qt,
            time: (new Date()).valueOf()
          }
        ))
        return post_qt
    } else {
        try {
            let _j = JSON.parse(localStorage.getItem("page_amount"))
            
            if((new Date()).valueOf() - (new Date(_j.time)).valueOf() > 300000 || !_j.max){
                
                var temp_req = await fetch("https://api.github.com/repos/TinyVirtual/tinyvirtual.github.io/contents/blog/posts/")
                var post_qt = (await temp_req.json()).length-2
                localStorage.setItem("page_amount",JSON.stringify({max:post_qt,time:(new Date()).valueOf()}))
                return post_qt
            } else {
                return _j.max
            }
        } catch(e) {
            var temp_req = await fetch("https://api.github.com/repos/TinyVirtual/tinyvirtual.github.io/contents/blog/posts/")
            var post_qt = (await temp_req.json()).length-2
            localStorage.setItem("page_amount",JSON.stringify({max:post_qt,time:(new Date()).valueOf()}))
            return post_qt
        }
    }
}


async function load_post(id){
    let _json
    let e = 200
    try {
        _json = await fetch(`./posts/${id}.json`)

        if(!_json.ok){
            containers.content().innerHTML = presets.err.replaceAll("$ERROR", `HTTP error! Status: ${_json.status}`)
            e = json.status
            throw new Error(`HTTP error! Status: ${_json.status}`);
        }

        _json = await _json.json().catch((e) => {
            containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error parsing JSON: ${e.message}`)
        })
    } finally {
        if(e != 404){
            let post_html = presets.blogpost
                .replaceAll("$PFP", _json.publisher.pfp)
                .replaceAll("$USER", _json.publisher.name)
                .replaceAll("$TITLE", _json.title)
                .replaceAll("$CONTENT", !!marked ? marked.parse(_json.contents.join("\n\n")) : _json.contents.join("\n"))
                .replaceAll("$DATE", new Date(_json.date).toLocaleTimeString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }))
                .replaceAll("$USRPAGE",`?user=${_json.publisher.username}`)
            let post_element = elementFromXml(post_html)
            console.log(post_element)
            containers.content().appendChild(post_element)
            
            document.getElementById("share_button").addEventListener("click",async ()=>{
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: "Tiny's Devblog Post",
                            text: `Post "${_json.title}" by ${_json.publisher.name}`,
                            url: window.location.href
                        })
                    } catch (err) {
                        console.error('Error sharing:', err)
                    }
                } else {
                    alert('Web Share API not supported in this browser.');
                }
            })
        } else {
            containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error status ${e} while fetching post!`)
        }
    }
};

async function load_page(page,max=10){
    let _json = []
    let aval = [0,0]
    let track = 0
    if(!isNaN(page)){
        var post_qt = await load_amount()
        //why -2? because index start at 0 and secret post
        
        
        try {
            
            for(let p = post_qt-(page * max); p > (post_qt-(page * max))-max; p--){
                let curr = _json.length
                
                
                _json[curr] = await fetch(`./posts/${p}.json`)

                if(!_json[curr].ok){
                    track++
                } else {
                    _json[curr] = await _json[curr].json().catch((e) => {})
                    containers.content().appendChild(elementFromXml(
                        presets.post
                            .replaceAll("$PFP", _json[curr].publisher.pfp) 
                            .replaceAll("$USER", _json[curr].publisher.name)
                            .replaceAll("$TITLE", _json[curr].title)
                            .replaceAll("$DESC", _json[curr].contents[0]+"...")
                            .replaceAll("$DATE", new Date(_json[curr].date).toLocaleTimeString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }))
                            .replaceAll("$LINK", `?post=${p}`)
                            .replaceAll("$IMAGE", !!_json[curr].image ? presets.post_image.replaceAll("$SOURCE", _json[curr].image) : "")
                            .replaceAll("$USRPAGE",`href="?user=${_json[curr].publisher.username}"`)
                    ))
                }
            }
            
            //console.log(track, _json.length)
            if(track == _json.length){
                containers.content().innerHTML = presets.page_unav.replaceAll("$ERR", "No posts found on this page!")
            } else {
                aval[0] = page > 0
                aval[1] = page*max+max < post_qt+1
                //console.log(aval[0],aval[1])
                
                
                containers.selector().innerHTML = presets.page_nav
                    .replaceAll("$LESS",aval[0] ? `href="?page=${Number(page)-1}"`:"")
                    .replaceAll("$MORE",aval[1] ? `href="?page=${Number(page)+1}"`:"")
                    .replaceAll("$NUMBER",page)
            }
        


        } catch (e) {
            console.warn(e)
        }
    } else {
        console.log(page)
        switch(page){
            case "users":
                try {
                    let users = await fetch("./extra/users.json")
                    if(!users.ok){
                        containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error status ${e.status} while fetching user data!`)
                        throw new Error("HTTP Error")
                    }
                    users = await users.json().catch((e)=>{
                        containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error occured while parsing JSON`)
                        throw new Error("HTTP Error")
                    })

                    let box = presets.users_container
                    let users_elements = []
                    for(let i of users.users){
                        users_elements[users_elements.length] = presets.user_box
                        .replaceAll("$USRPAGE","?user="+i.username)
                        .replaceAll("$SOURCE",i.avatar)
                        .replaceAll("$DISPLAYNAME",i.display_name)
                        .replaceAll("$USERNAME",i.username)
                        .replaceAll("$CONTENTS", !!marked ? marked.parse(i.bio.join("\n\n")) : `<a>${i.bio.join("<br>")}</a>`)
                    }

                    box = box.replaceAll("$USERS",users_elements.join("\n"))
                    
                    containers.content().innerHTML = box

                } catch(e) {
                    containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error "${e.message}" while fetching user data!`)
                }
            break;
            case "privacy":
                try {
                let privacy_text = await fetch("./extra/privacy.json")
                
                if(!privacy_text.ok){
                    containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error status ${e.status} while fetching privacy & terms!`)
                    throw new Error("HTTP Error")
                }
                privacy_text = await privacy_text.json().catch((e)=>{
                    containers.content().innerHTML = presets.err.replaceAll("$ERROR", `Error occured while parsing JSON`)
                    throw new Error("HTTP Error")
                })

                containers.content().innerHTML = presets.privacy
                    .replaceAll("$CONTENT",marked.parse(privacy_text.terms.join("\n\n")))
                    .replaceAll("$UPDATED",new Date(privacy_text.updated).toLocaleTimeString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }))

                } catch(e) {
                    console.error(e)
                }
            break
            default:
                containers.content().innerHTML = presets.err.replaceAll("$ERROR", `This page does not exists (yet)!`)
            break;
            
        }
    }
}

async function load_user(username) {
    try{
        let _json = await fetch("./extra/users.json")
        if(!_json.ok){
            containers.content().innerHTML = presets.err.replaceAll("$ERROR","Could not load users.json! Try again later!")
            throw new Error("Could not load users.json! Try again later!")
        }

        _json = await _json.json().catch((e)=>{
            containers.content().innerHTML = presets.err.replaceAll("$ERROR","An error occured while loading users.json! Try again later!")
            throw new Error("An error occured while loading users.json! Try again later!")
        })

        let i
        for(let u of _json.users){
            if(u.username == username){
                i = u
            }
        }
        if(typeof i === "undefined"){
            containers.content().innerHTML = presets.user_unav.replaceAll("$USER",username)
        }

        containers.content().innerHTML = presets.user_box_page
                        .replaceAll("$SOURCE",i.avatar)
                        .replaceAll("$DISPLAYNAME",i.display_name)
                        .replaceAll("$USERNAME",i.username)
                        .replaceAll("$CONTENTS", !!marked ? marked.parse(i.bio.join("\n\n")) : `<a>${i.bio.join("<br>")}</a>`)

        
    } catch(e) {

    }
}

console.log(params.values())

setTimeout(()=>{
    if (params.has("post")){
        load_post(params.get("post"))
    } else if (params.has("page")){
        load_page(params.get("page"))
    } else if (params.has("user")){
        load_user(params.get("user"))
    } else {
        window.location.search = "?page=error"
    }
},10)
