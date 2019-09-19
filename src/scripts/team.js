(function(){

let teamSection = () => {
    let membersName = document.querySelectorAll('.members__name');

    membersName.forEach(function(membersLink) {
        membersLink.addEventListener("click", function(e) {
            e.preventDefault();
            let activeMember = document.querySelector(".members__item--active");

            if (activeMember) {
                let membersDesc = activeMember.querySelector(".members__desc");
                membersDesc.style.height = "0px";
                activeMember.classList.remove("members__item--active");
            }

            if (!activeMember || activeMember.querySelector(".members__name") !== e.target) {
                let currentMember = e.target.closest(".members__item");
                currentMember.classList.add("members__item--active");
                let currentMemberDesc = currentMember.querySelector(".members__desc");
                currentMemberDesc.style.height = currentMemberDesc.scrollHeight + "px";
            }
        })
    })
};
teamSection();
})()