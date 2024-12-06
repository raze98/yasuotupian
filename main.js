document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const quality = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    let originalFile = null;

    // 上传区域点击事件
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 拖拽上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#007AFF';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    // 文件选择
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // 质量滑块
    quality.addEventListener('input', () => {
        qualityValue.textContent = quality.value + '%';
        if (originalFile) {
            compressImage(originalFile);
        }
    });

    // 处理上传的文件
    function handleFile(file) {
        originalFile = file;
        originalSize.textContent = formatFileSize(file.size);

        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
            compressImage(file);
            previewArea.hidden = false;
        };
        reader.readAsDataURL(file);
    }

    // 压缩图片
    function compressImage(file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    compressedImage.src = URL.createObjectURL(blob);
                    compressedSize.textContent = formatFileSize(blob.size);
                    
                    downloadBtn.onclick = () => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `compressed_${file.name}`;
                        link.click();
                    };
                },
                file.type,
                quality.value / 100
            );
        };
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 设置图片点击事件
    originalImage.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = originalImage.src;
    });

    compressedImage.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = compressedImage.src;
    });

    // 关闭弹窗
    closeModal.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = "none";
    });

    modal.addEventListener('click', () => {
        modal.style.display = "none";
    });
}); 