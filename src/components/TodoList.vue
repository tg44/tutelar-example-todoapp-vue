<template>
  <div>
  <v-card
    max-width="600"
    class="mx-auto"
  >
    <v-toolbar
      color="light-blue"
      dark
    >
      <v-toolbar-title>TODO List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="injectDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.id"
      >
        <v-list-item-avatar>
          <v-btn icon v-if="item.done" @click="unCheck(item)">
            <v-icon color="green white--text">mdi-checkbox-marked</v-icon>
          </v-btn>
          <v-btn icon v-if="!item.done" @click="check(item)">
            <v-icon color="yellow white--text">mdi-checkbox-blank-outline</v-icon>
          </v-btn>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="startEdit(item)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="onDelete(item)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

  </v-card>

  <v-dialog v-model="injectDialog" max-width="600px">
    <v-card>
      <v-card-title primary-title class="layout justify-center">
        <h2 class="headline">Add TODO</h2>
      </v-card-title>

      <v-card-text>
        <v-form autocomplete="off" ref="form">
          <v-text-field
            v-model="title"
          >Title</v-text-field>
          <v-spacer></v-spacer>
          <div class="text-xs-center">
            <v-btn class="primary mx-0 mt-3" @click="add"
            >Add</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title primary-title class="layout justify-center">
          <h2 class="headline">Edit TODO</h2>
        </v-card-title>

        <v-card-text>
          <v-form autocomplete="off" ref="form">
            <v-text-field
              v-model="title"
            >Title</v-text-field>
            <v-spacer></v-spacer>
            <div class="text-xs-center">
              <v-btn class="primary mx-0 mt-3" @click="edit"
              >Edit</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        injectDialog: false,
        editDialog: false,
        editItem: null,
        title: ""
      }
    },
    computed: {
      ...mapGetters(["items"])
    },
    created() {
      this.$store.dispatch("load")
    },
    methods: {
      add() {
        this.$store
          .dispatch("addNewItem", {title: this.title, done: false})
          .then(() => {
            this.title = "";
            this.injectDialog = false;
          }).catch(err => {
          this.$store.dispatch("onError", err); // error handling done in store
        });
      },
      editCheck(item, done) {
        this.$store
          .dispatch("editDone", {item: item, done: done})
          .catch(err => {
            this.$store.dispatch("onError", err); // error handling done in store
          });
      },
      unCheck(item) {
        this.editCheck(item, false);
      },
      check(item) {
        this.editCheck(item, true);
      },
      startEdit(item) {
        this.editItem = item;
        this.title = item.title;
        this.editDialog = true;
      },
      edit() {
        this.$store
          .dispatch("editTitle", {item: this.editItem, title: this.title})
          .then(() => {
            this.editItem = null;
            this.title = "";
            this.editDialog = false;
          }).catch(err => {
          this.$store.dispatch("onError", err); // error handling done in store
        });
      },
      onDelete(item) {
        this.$store
          .dispatch("remove", item)
          .catch(err => {
            this.$store.dispatch("onError", err); // error handling done in store
          });
      }
    }
  }
</script>
