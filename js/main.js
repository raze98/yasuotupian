document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const previewContainer = document.getElementById('previewContainer');
    const downloadAllBtn = document.getElementById('downloadAll');

    // 压缩选项
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };

    // 处理拖放
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // 点击上传
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // 质量滑块
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = `${e.target.value}%`;
        options.quality = parseInt(e.target.value) / 100;
    });

    // 处理文件
    async function handleFiles(files) {
        previewContainer.innerHTML = '';
        downloadAllBtn.disabled = false;
        
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;

            const div = document.createElement('div');
            div.className = 'preview-item';

            // 显示原始图片信息
            div.innerHTML = `
                <div class="original">
                    <h4>原图</h4>
                    <img src="${URL.createObjectURL(file)}" alt="原图">
                    <p>大小: ${(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <div class="compressed">
                    <h4>压缩后</h4>
                    <div class="loading">压缩中...</div>
                </div>
            `;

            previewContainer.appendChild(div);

            // 压缩图片
            try {
                const compressedFile = await imageCompression(file, {
                    ...options,
                    quality: parseInt(qualitySlider.value) / 100
                });

                const compressedDiv = div.querySelector('.compressed');
                compressedDiv.innerHTML = `
                    <img src="${URL.createObjectURL(compressedFile)}" alt="压缩后">
                    <p>大小: ${(compressedFile.size / 1024).toFixed(2)} KB</p>
                    <button class="download-single">下载</button>
                `;

                // 单个下载按钮事件
                compressedDiv.querySelector('.download-single').addEventListener('click', () => {
                    saveAs(compressedFile, `compressed_${file.name}`);
                });
            } catch (error) {
                console.error('压缩失败:', error);
                div.querySelector('.compressed').innerHTML = '<p class="error">压缩失败</p>';
            }
        }
    }

    // 下载所有压缩后的图片
    downloadAllBtn.addEventListener('click', () => {
        const compressedImages = previewContainer.querySelectorAll('.compressed img');
        compressedImages.forEach((img, index) => {
            fetch(img.src)
                .then(res => res.blob())
                .then(blob => {
                    saveAs(blob, `compressed_${index + 1}.jpg`);
                });
        });
    });
}); 