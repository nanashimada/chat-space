$(function(){

	var userList = $("#user-search-result");
	var chatMember = $(".chat-group-member");

	function appendUser(user) {
		var html = `<div class="chat-group-user clearfix" id="chat-member">
  						<p class="chat-group-user__name">${user.name}</p>
  						<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
					</div>`
		userList.append(html);
	}
	function appendNoUser(user) {
		var html = `<div class="chat-group-user clearfix">
  						${ user }
					</div>`
		userList.append(html);
	}

	function appendGroupUser(user_id, user_name){
		var html =`<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
						<input name='group[user_ids][]' type='hidden' value='${user_id}'>
  						<p class="chat-group-user__name">${user_name}</p>
  						<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
					</div>`
		chatMember.append(html);
	}

  	$("#user-search-field").on("keyup",function() {
    	var input = $("#user-search-field").val();

    	$.ajax({
      		type: "GET",
      		url: '/users',
      		data: { name: input },
      		dataType: 'json'
    	})

   		.done(function(users) {
   		userList.empty();
     		if (users.length !==0) {
     			users.forEach(function(user){
      				appendUser(user);
      			})
    		}
      		else{
       			appendNoUser("一致するメンバーがいません");
      		}
   		})
    	.fail(function(){
      		alert('error');
    	})

    	$(document).on("click",".user-search-add",function(){
    		$(this).parent().remove();
    		var userId = $(this).attr("data-user-id");
    		var userName = $(this).attr("data-user-name");
    			appendGroupUser(userId, userName);
    	})
    	$(document).on("click",".user-search-remove",function(){
    		$(this).parent().remove();
    	})
	});
});


