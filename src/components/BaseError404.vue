<!-- views/errors/404.vue -->
<template>
  <v-app style="background: #fff;">
    <v-main>
      <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
        <div class="text-center" style="max-width: 480px;">

          <div class="mx-auto mb-6" style="
            width: 64px; height: 64px; border-radius: 50%;
            background: #E6F1FB;
            display: flex; align-items: center; justify-content: center;
          ">
            <v-icon color="#378ADD" size="28">mdi-file-search-outline</v-icon>
          </div>

          <div style="font-size: 120px; font-weight: 300; line-height: 1; letter-spacing: -6px; color: #111; font-family: 'DM Sans', sans-serif;">
            4<span style="color: #378ADD;">0</span>4
          </div>

          <div style="width: 40px; height: 2px; background: #378ADD; margin: 1.5rem auto; border-radius: 2px;" />

          <p style="font-size: 20px; font-weight: 500; color: #111; margin-bottom: 12px;">
            Halaman Tidak Ditemukan
          </p>

          <code style="
            display: inline-block; font-size: 13px;
            background: #F1EFE8; color: #5F5E5A;
            padding: 4px 12px; border-radius: 6px;
            margin-bottom: 1.5rem; word-break: break-all;
          ">{{ $route.fullPath }}</code>

          <p style="font-size: 15px; color: #888780; line-height: 1.7; margin-bottom: 2.5rem;">
            URL yang kamu akses tidak tersedia atau sudah dipindahkan.<br>
            Periksa kembali alamat yang kamu ketik.
          </p>

          <div class="d-flex justify-center ga-3 flex-wrap">
            <v-btn
              color="#111"
              style="font-family: 'DM Sans', sans-serif; border-radius: 8px;"
              @click="$router.push('/')"
            >
              Kembali ke Beranda
            </v-btn>
            <v-btn
              variant="outlined"
              style="font-family: 'DM Sans', sans-serif; border-radius: 8px; border-color: #D3D1C7; color: #5F5E5A;"
              @click="$router.back()"
            >
              Kembali
            </v-btn>
          </div>

        </div>
      </v-container>
    </v-main>
  </v-app>
</template>