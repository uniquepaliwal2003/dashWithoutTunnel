mainWrapper = document.getElementById("mainWrapperExcel");
//TotalEmails
function btnUserByMonthTotalEmails(){
    TableContainerTotalEmails = document.getElementById("TableContainerTotalEmails");
    BackMainContentTotalEmails = document.getElementById    ("BackMainContentTotalEmails");
    mainWrapper.classList.toggle('showingIt');
    TableContainerTotalEmails.classList.toggle('showingIt');
    if(!myGridTotalEmails)
    gridTotalEmails();
}
BackMainContentTotalEmails = document.getElementById    ("BackMainContentTotalEmails");
BackMainContentTotalEmails.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerTotalEmails.classList.toggle('showingIt');   
})
//AbsentEmails
function btnUserByMonthAbsentEmails(){
    TableContainerAbsentEmails = document.getElementById("TableContainerAbsentEmails");
    BackMainContentAbsentEmails = document.getElementById    ("BackMainContentAbsentEmails");
    mainWrapper.classList.toggle('showingIt');
    TableContainerAbsentEmails.classList.toggle('showingIt');
    if(!myGridAbsentEmails)
    gridAbsentEmails();
}
BackMainContentAbsentEmails = document.getElementById    ("BackMainContentAbsentEmails");
BackMainContentAbsentEmails.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerAbsentEmails.classList.toggle('showingIt');   
})
//Paye
function btnUserByMonthPaye(){
    TableContainerPaye = document.getElementById("TableContainerPaye");
    mainWrapper.classList.toggle('showingIt');
    TableContainerPaye.classList.toggle('showingIt');
    if(!myGridPaye)
    gridPaye();
}
BackMainContentPaye = document.getElementById    ("BackMainContentPaye");
BackMainContentPaye.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerPaye.classList.toggle('showingIt');   
})
//Director
function btnUserByMonthDirector(){
    TableContainerDirector = document.getElementById("TableContainerDirector");
    BackMainContentDirector = document.getElementById    ("BackMainContentDirector");
    mainWrapper.classList.toggle('showingIt');
    TableContainerDirector.classList.toggle('showingIt');
    if(!myGridDirector)
    gridDirector();
}
BackMainContentDirector = document.getElementById    ("BackMainContentDirector");
BackMainContentDirector.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerDirector.classList.toggle('showingIt');   
})
//Plc
function btnUserByMonthPlc(){
    TableContainerPlc = document.getElementById("TableContainerPlc");
    BackMainContentPlc = document.getElementById    ("BackMainContentPlc");
    mainWrapper.classList.toggle('showingIt');
    TableContainerPlc.classList.toggle('showingIt');
    if(!myGridPlc)
    gridPlc();
}
BackMainContentPlc = document.getElementById    ("BackMainContentPlc");
BackMainContentPlc.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerPlc.classList.toggle('showingIt');   
})
//Active
function btnUserByMonthActive(){
    TableContainerActive = document.getElementById("TableContainerActive");
    BackMainContentActive = document.getElementById    ("BackMainContentActive");
    mainWrapper.classList.toggle('showingIt');
    TableContainerActive.classList.toggle('showingIt');
    if(!myGridActive)
    gridActive();
}
BackMainContentActive = document.getElementById    ("BackMainContentActive");
BackMainContentActive.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerActive.classList.toggle('showingIt');   
})
//LimitedActive
function btnUserByMonthLimitedActive(){
    TableContainerLimitedActive = document.getElementById("TableContainerLimitedActive");
    BackMainContentLimitedActive = document.getElementById    ("BackMainContentLimitedActive");
    mainWrapper.classList.toggle('showingIt');
    TableContainerLimitedActive.classList.toggle('showingIt');
    if(!myGridLimitedActive)
    gridLimitedActive();
}
BackMainContentLimitedActive = document.getElementById    ("BackMainContentLimitedActive");
BackMainContentLimitedActive.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerLimitedActive.classList.toggle('showingIt');   
})
//LimitedInactive
function btnUserByMonthLimitedInactive(){
    TableContainerLimitedInactive = document.getElementById("TableContainerLimitedInactive");
    BackMainContentLimitedInactive = document.getElementById    ("BackMainContentLimitedInactive");
    mainWrapper.classList.toggle('showingIt');
    TableContainerLimitedInactive.classList.toggle('showingIt');
    if(!myGridLimitedInactive)
    gridLimitedInactive();
}
BackMainContentLimitedInactive = document.getElementById    ("BackMainContentLimitedInactive");
BackMainContentLimitedInactive.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerLimitedInactive.classList.toggle('showingIt');   
})
//Inactive
function btnUserByMonthInactive(){
    TableContainerInactive = document.getElementById("TableContainerInactive");
    mainWrapper.classList.toggle('showingIt');
    TableContainerInactive.classList.toggle('showingIt');
    if(!myGridInactive)
    gridInactive();
}
BackMainContentInactive = document.getElementById    ("BackMainContentInactive");
BackMainContentInactive.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerInactive.classList.toggle('showingIt');   
})
//Pending
function btnUserByMonthPending(){
    TableContainerPending = document.getElementById("TableContainerPending");
    BackMainContentPending = document.getElementById    ("BackMainContentPending");
    mainWrapper.classList.toggle('showingIt');
    TableContainerPending.classList.toggle('showingIt');
    if(!myGridPending)
    gridPending();
}
BackMainContentPending = document.getElementById    ("BackMainContentPending");
BackMainContentPending.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerPending.classList.toggle('showingIt');   
})
//Four
function btnUserByMonthFour(){
    TableContainerFour = document.getElementById("TableContainerFour");
    mainWrapper.classList.toggle('showingIt');
    TableContainerFour.classList.toggle('showingIt');
    if(!myGridFour)
    gridFour();
}
BackMainContentFour = document.getElementById    ("BackMainContentFour");
BackMainContentFour.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerFour.classList.toggle('showingIt');   
})
//One
function btnUserByMonthOne(){
    TableContainerOne = document.getElementById("TableContainerOne");
    BackMainContentOne = document.getElementById    ("BackMainContentOne");
    mainWrapper.classList.toggle('showingIt');
    TableContainerOne.classList.toggle('showingIt');
    if(!myGridOne)
    gridOne();
}
BackMainContentOne = document.getElementById    ("BackMainContentOne");
BackMainContentOne.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerOne.classList.toggle('showingIt');   
})
//Three
function btnUserByMonthThree(){
    TableContainerThree = document.getElementById("TableContainerThree");
    BackMainContentThree = document.getElementById    ("BackMainContentThree");
    mainWrapper.classList.toggle('showingIt');
    TableContainerThree.classList.toggle('showingIt');
    if(!myGridThree)
    gridThree();
}
BackMainContentThree = document.getElementById    ("BackMainContentThree");
BackMainContentThree.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerThree.classList.toggle('showingIt');   
})