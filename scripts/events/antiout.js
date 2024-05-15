module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Nayan",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator na pasikat";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`আরেহ ${name} কইরে তুই group\n\n${name} গ্রুপে অ্যাড দিতাম তোরে খুঁজে পাচ্ছি না যে !! ওহ আচ্ছা!!!! (oꆤ︵ꆤo)শালায় আমারে ব্লক দিছে, হিতেরে অ্যাড করতে পারতেছি না! ●︿● `, event.threadID)
   } else api.sendMessage(`${name} ꧁༺😅আমাগো রে রেখে পালাতে চাচ্ছিস?😅༻꧂`, event.threadID);
  })
 }
}
