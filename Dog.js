
class Dog {
    constructor(data){
        Object.assign(this, data)
    }

    setLike(){
        this.hasBeenSwiped = true
        this.hasBeenLiked = true
    }
    setNope(){
        this.hasBeenSwiped = true
        this.hasBeenLiked = false
    }

    getDogHtml(){
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked} = this
        return`
        
        <main>
            <section class="img">
                <img class='dog-img' src="${avatar}" alt="user image">
               ${hasBeenSwiped && `<img class='badge' src="${hasBeenLiked ? `./img/badge-like.png` : `./img/badge-nope.png`}" alt="badge">`}
                <div class="img--info">
                    <h2 class="personal">${name}, ${age}</h2>
                    <p class="description">${bio}</p>
                </div>
            </section>            

        </main>`
    }
}

export default Dog