$(function(){
  function buildHTML(message){
    var addimage = message.image ? `<img src= "${message.image}">` : "";
    var html = `<div class= "chat-main__body-content" data-id="${message.id}" >
                  <ul class="chat-main__body-messages">
                    <li class="chat-main__body-messages-name">
                      ${message.user_name}
                    </li>
                    <li class="chat-main__body-messages-time">
                      ${message.created_at}
                    </li>
                  </ul>
                  <div class= "chat-main__body-messages-context">
                    ${message.body}
                    ${addimage}
                  </div>
                </div>`
    return html;
  }
	$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action');
    $.ajax({
      	url: url,
      	type: "POST",
      	data: formData,
      	dataType: 'json',
      	processData: false,
      	contentType: false,
        cache: false
  	})
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.chat-main__footer-body-message').val('');
      $('.chat-main__body').animate({'scrollTop': $('.chat-main__body')[0].scrollHeight},1);
      $('.chat-main__footer-body-submit').attr('disabled', false);　
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
       var id = $('.chat-main__body-content')[0] ? $('.chat-main__body-content:last').data('id') : 0;
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: { 
          message: { id: id, group_id = group_id}
        },
        dataType: 'json'
      })

      .done(function(messages){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message);
        })
        $('.chat-main__body').append(insertHTML);
        $('.chat-main__body').animate({'scrollTop': $('.chat-main__body')[0].scrollHeight},1);
      })
      .fail(function(message) {
        alert('自動更新に失敗しました');
      })
    }
    else{
      clearInterval(interval);
    }
  },5000);
});
