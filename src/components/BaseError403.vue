views/errors/403.vue
<template>
  <v-app style="background: #fff;">
    <v-main>
      <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
        <div class="text-center" style="max-width: 480px;">

          <!-- icon -->
          <div class="mx-auto mb-6" style="
            width: 64px; height: 64px; border-radius: 50%;
            background: #FCEBEB;
            display: flex; align-items: center; justify-content: center;
          ">
            <v-icon color="#E24B4A" size="28">mdi-cancel</v-icon>
          </div>

          <!-- kode -->
          <div style="font-size: 120px; font-weight: 300; line-height: 1; letter-spacing: -6px; color: #111; font-family: 'DM Sans', sans-serif;">
            4<span style="color: #E24B4A;">0</span>3
          </div>

          <div style="width: 40px; height: 2px; background: #E24B4A; margin: 1.5rem auto; border-radius: 2px;" />

          <p style="font-size: 20px; font-weight: 500; color: #111; margin-bottom: 12px;">
            Akses Ditolak
          </p>
          <p style="font-size: 15px; color: #888780; line-height: 1.7; margin-bottom: 2.5rem;">
            Kamu tidak memiliki izin untuk mengakses aplikasi ini.<br>
            Hubungi administrator jika kamu merasa ini kesalahan.
          </p>

          <div class="d-flex justify-center ga-3 flex-wrap">
            <!-- <v-btn
              color="#111"
              style="font-family: 'DM Sans', sans-serif; border-radius: 8px;"
              @click="$router.push('/')"
            >
              Kembali ke Beranda
            </v-btn>
            <v-btn
              variant="outlined"
              style="font-family: 'DM Sans', sans-serif; border-radius: 8px; border-color: #D3D1C7; color: #5F5E5A;"
              @click="contactAdmin"
            >
              Hubungi Admin
            </v-btn> -->
          </div>

        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>