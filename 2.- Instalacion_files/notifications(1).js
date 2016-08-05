Platzi.Views.NotificationView = Backbone.View.extend({
	events : {
        'click .item.true' : 'ClickNotification'
	},
	initialize : function(model){
        // var self = this;

        this.model = model;
        if(window.app.notifications_state !== 'all'){
            this.template = _.template($("#notification_tpl").html());
        }else{
            this.template = _.template($("#notifications_list").html());
        }
    },
    render : function(){
        var locals ={
            notification : this.model.toJSON()
        };
        var dateArray = locals.notification.date.split(',');
        var localizeDate = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]));

        var dateFormat = localizeDate;
        var year           = dateFormat.getFullYear().toString(),
            month          = (dateFormat.getMonth() + 1).toString(),
            day            = (dateFormat.getDate()).toString(),
            hour           = dateFormat.getHours().toString(),
            min            = dateFormat.getMinutes().toString(),
            sec            = dateFormat.getSeconds().toString();
        var date       = moment(month+"-"+day+"-"+year+" "+hour+":"+min+":"+sec, 'MM-DD-YYYY HH:mm:ss').lang('es').fromNow();
        locals.notification.date = date;
        this.$el.html(this.template(locals));
    },
    ClickNotification: function(e){
        e.preventDefault();
        var this_url = $(this.$el).find('a').attr('href');
        var collection = window.collections.notifications_list;
        var this_notify = collection.findWhere({"url":this_url});
        var xhr_set_notify = $.post( "/clases/notifications/", { id:this_notify.toJSON().id } );
        xhr_set_notify.done(function(){
            window.location = this_url;
        })
    }
});