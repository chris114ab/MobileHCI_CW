/*
 * Walker component: animates user position.
 */
AFRAME.registerComponent("walker", {
    schema: {
      started: {default: false},
    },
  
    init: function () {
      this.el.setAttribute("animation__walk1", "startEvents: walk1; property: position; easing: linear; loop: false; dur: 3000; from: 0 1.6 0; to: 0 1.6 -60;");
      this.el.setAttribute("animation__turn1", "startEvents: turn1; property: rotation; easing: linear; loop: false; dur: 2000; to: 0 180 0;");
      this.el.setAttribute("animation__walk2", "startEvents: walk2; property: position; easing: linear; loop: false; dur: 3000; to: 0 1.6 0;");
      this.el.setAttribute("animation__turn2", "startEvents: turn2; property: rotation; easing: linear; loop: false; dur: 2000; to: 0 0 0;");
  
      this.el.addEventListener("animationcomplete__walk1", e => {
        this.el.setAttribute("look-controls", "enabled: false;");
        this.el.emit("turn1");
      });
  
      this.el.addEventListener("animationcomplete__turn1", e => {
        this.el.setAttribute("look-controls", "enabled: true;");
        this.el.emit("walk2");
      });
  
      this.el.addEventListener("animationcomplete__walk2", e => {
        this.el.setAttribute("look-controls", "enabled: false;");
        this.el.emit("turn2");
      });
  
      this.el.addEventListener("animationcomplete__turn2", e => {
        this.el.setAttribute("look-controls", "enabled: true;");
        this.el.emit("walk1");
      });
  
      //this.el.emit("walk1");
    },
  
    tick: function () {
      var camera = this.el.sceneEl.querySelector("#person");
      var camera_position = camera.getAttribute("position");
  
      if (!this.data.started) {
        this.data.started = true;
  
        // this.el.setAttribute("animation__walk1", "property: position; easing: linear; loop: false; dur: 3000; from: " + formatPosition(camera_position) + "; to: " + formatPosition(addToPosition(camera_position, 0, 0, -60)));
      }
    },
  });