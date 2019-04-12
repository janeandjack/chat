
export const UserconnectionMsg = {
    props: ['msg'],

    template: `
        <p v-if="matchedID" class="alert">
       
           
            <span class="smaller">({{msg.id}})</span>
            joined channel
        </p>

    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
 
        };
    }
};

export const UserdisconnectionMsg = {
    props: ['msg'],

    template: `
        <p v-if="matchedID" class="notification">
       
   
            <span class="smaller">({{msg.id}})</span>
            left hannel
        </p>

    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
 
        };
    }
};