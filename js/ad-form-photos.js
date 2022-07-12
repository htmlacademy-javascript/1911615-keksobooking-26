const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export function setPhotosPreview(input, target) {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      target.src = URL.createObjectURL(file);
    }
  });}

export function setDropZone(dropZone, input) {
  dropZone.ondragover = dropZone.ondragenter = function(evt) {
    evt.preventDefault();
  };

  dropZone.ondrop = function(evt) {
    input.files = evt.dataTransfer.files;

    const dT = new DataTransfer();
    dT.items.add(evt.dataTransfer.files[0]);
    input.files = dT.files;
    input.dispatchEvent(new Event('change'));

    evt.preventDefault();
  };
}
