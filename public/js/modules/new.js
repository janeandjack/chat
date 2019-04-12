
export const UserconnectionMsg = {
    props: ['msg'],

    template: `
    <p v-if="matchedID" class="alert">

    <span>({{msg.id}})</span>
    joined channel
</p>
<p v-else class="alert">
    <span>({{msg.id}})</span>
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
    <p v-if="matchedID" class="alert">
  
    <span>({{msg.id}})</span>
    left channel
</p>
<p v-else class="alert">
    <span>({{msg.id}})</span>
    left channel
</p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
 
        };
    }
};