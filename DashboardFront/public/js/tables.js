mainWrapper = document.getElementById("mainWrapper");
//User Table
btnUserByMonth = document.getElementById("btnUserByMonth");
TableContainer = document.getElementById("TableContainer");
BackMainContent = document.getElementById("BackMainContent");
btnUserByMonth.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainer.classList.toggle('showingIt');
    if(!myUserByMonthGrid)
        userByMonthTable();
});
BackMainContent.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainer.classList.toggle('showingIt');   
})
//Documents
btnUserByMonthDocuments = document.getElementById("btnUserByMonthDocuments");
TableContainerDocuments = document.getElementById("TableContainerDocuments");
BackMainContentDocuments = document.getElementById("BackMainContentDocuments");
btnUserByMonthDocuments.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerDocuments.classList.toggle('showingIt');
    if(!myGridDocRecMisstableOne)
        DocumentsRecMissTableOne();
    if(!myGridDocRecMisstableTwo)
        DocumentsRecMissTableTwo();
});
BackMainContentDocuments.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerDocuments.classList.toggle('showingIt');   
})
//Umbrella
btnUserByMonthUmbrella = document.getElementById("btnUserByMonthUmbrella");
TableContainerUmbrella = document.getElementById("TableContainerUmbrella");
BackMainContentUmbrella = document.getElementById("BackMainContentUmbrella");
btnUserByMonthUmbrella.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerUmbrella.classList.toggle('showingIt');
    if(!myGridUmbrella)
        Umbrella();
});
BackMainContentUmbrella.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerUmbrella.classList.toggle('showingIt');   
})
//MissDoc
btnUserByMonthConMissDoc = document.getElementById("btnUserByMonthConMissDoc");
TableContainerConMissDoc = document.getElementById("TableContainerConMissDoc");
BackMainContentConMissDoc = document.getElementById("BackMainContentConMissDoc");
btnUserByMonthConMissDoc.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerConMissDoc.classList.toggle('showingIt');
    if(!myGrididpal)
        MissingDocumentsIDpal();
    if(!myGridagency)
        MissingDocumentsagency();
    if(!myGridpps)
        MissingDocumentspps();
    if(!myGridB10)
        MissingDocumentsB10();
    if(!myGridtandc)
        MissingDocumentstandc();
});
BackMainContentConMissDoc.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerConMissDoc.classList.toggle('showingIt');   
})
//Unique
btnUserByMonthUnique = document.getElementById("btnUserByMonthUnique");
TableContainerUnique = document.getElementById("TableContainerUnique");
BackMainContentUnique = document.getElementById("BackMainContentUnique");
btnUserByMonthUnique.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerUnique.classList.toggle('showingIt');
    if(!myGridUniqueconPer)
        UniqueConPerMontPerMonthUmbrella();
});
BackMainContentUnique.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerUnique.classList.toggle('showingIt');   
})
//Missing Information
// btnUserByMonthMissInfo = document.getElementById("btnUserByMonthMissInfo");
// TableContainerMissInfo = document.getElementById("TableContainerMissInfo");
// BackMainContentMissInfo = document.getElementById("BackMainContentMissInfo");
// btnUserByMonthMissInfo.addEventListener('click', function() {
//     // Toggle the 'active' class on the button
//     mainWrapper.classList.toggle('showingIt');
//     TableContainerMissInfo.classList.toggle('showingIt');
// });
// BackMainContentMissInfo.addEventListener('click',function(){
//     mainWrapper.classList.toggle('showingIt');   
//     TableContainerMissInfo.classList.toggle('showingIt');   
// })
//No management Fees
btnUserByMonthNoMagF = document.getElementById("btnUserByMonthNoMagF");
TableContainerNoMagF = document.getElementById("TableContainerNoMagF");
BackMainContentNoMagF = document.getElementById("BackMainContentNoMagF");
btnUserByMonthNoMagF.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerNoMagF.classList.toggle('showingIt');
    if(!myGridUserAllNoMag)
        contractorsWithNoManagementFeesDeducted();
});
BackMainContentNoMagF.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerNoMagF.classList.toggle('showingIt');   
})
//Contractor not paid
btnUserByMonthConNotPaid = document.getElementById("btnUserByMonthConNotPaid");
TableContainerConNotPaid = document.getElementById("TableContainerConNotPaid");
BackMainContentConNotPaid = document.getElementById("BackMainContentConNotPaid");
btnUserByMonthConNotPaid.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerConNotPaid.classList.toggle('showingIt');
    if(!myGridAllConPaid)
        totalContractorNotPaid();
});
BackMainContentConNotPaid.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerConNotPaid.classList.toggle('showingIt');   
})
//STart two
// btnUserByMonthStartTwo = document.getElementById("btnUserByMonthStartTwo");
// TableContainerStartTwo = document.getElementById("TableContainerStartTwo");
// BackMainContentStartTwo = document.getElementById("BackMainContentStartTwo");
// btnUserByMonthStartTwo.addEventListener('click', function() {
//     // Toggle the 'active' class on the button
//     mainWrapper.classList.toggle('showingIt');
//     TableContainerStartTwo.classList.toggle('showingIt');
// });
// BackMainContentStartTwo.addEventListener('click',function(){
//     mainWrapper.classList.toggle('showingIt');   
//     TableContainerStartTwo.classList.toggle('showingIt');   
// })
//Month invoice
btnUserByMonthMonInvo = document.getElementById("btnUserByMonthMonInvo");
TableContainerMonInvo = document.getElementById("TableContainerMonInvo");
BackMainContentMonInvo = document.getElementById("BackMainContentMonInvo");
btnUserByMonthMonInvo.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerMonInvo.classList.toggle('showingIt');
    if(!myGridUserAllMonInvo)
        noInvoiceSendAndStartDateWithin2Month();
});
BackMainContentMonInvo.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerMonInvo.classList.toggle('showingIt');   
})
// plc contractor paid per month
btnPlcContractorsPaidPerMonth = document.getElementById("btnPlcContractorsPaidPerMonth");
TableContainerPlcPerAccountManager = document.getElementById("TableContainerPlcPerAccountManager");
BackMainContentPlcPerAccountManager = document.getElementById("BackMainContentPlcPerAccountManager");
btnPlcContractorsPaidPerMonth.addEventListener('click', function() {
    // Toggle the 'active' class on the button
    mainWrapper.classList.toggle('showingIt');
    TableContainerPlcPerAccountManager.classList.toggle('showingIt');
    if(!myGridUserAllPlcPerAccountManager)
        totalPlcPerAccountManager();
});
BackMainContentPlcPerAccountManager.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerPlcPerAccountManager.classList.toggle('showingIt');   
})